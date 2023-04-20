import { NextResponse } from "next/server"
import { interviewInsurance } from "$lib/openai"
import { getServerSession } from "next-auth"
import { authOptions } from "$pages/api/auth/[...nextauth]"
import { findInsuranceFile } from "$lib/db"

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  const body = await request.json()

  const insurance = await findInsuranceFile(body.id)
  if (!insurance) {
    return {}
  }

  try {
    const summary = await interviewInsurance(
      insurance.content,
      session?.user?.name ?? "",
      body.messages
    )
    return NextResponse.json({
      summary: summary[0].message?.content ?? "",
      choices: summary,
    })
  } catch (e) {
    console.log(e)
  }

  return {}
}

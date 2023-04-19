import { NextResponse } from "next/server"
import { interviewInsurance, summarize } from "$lib/openai"
import { findInsuranceFile } from "$lib/insurance"
import { getServerSession } from "next-auth"
import { authOptions } from "$pages/api/auth/[...nextauth]"

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

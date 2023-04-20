import { NextResponse } from "next/server"
import { chat } from "$lib/openai"
import { getServerSession } from "next-auth"
import { authOptions } from "$pages/api/auth/[...nextauth]"

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  const body = await request.json()

  try {
    const summary = await chat(session?.user?.name ?? "", body.messages)
    return NextResponse.json({
      summary: summary[0].message?.content ?? "",
      choices: summary,
    })
  } catch (e) {
    console.log(e)
  }

  return {}
}

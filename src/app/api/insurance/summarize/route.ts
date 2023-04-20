import { NextResponse } from "next/server"
import { summarize } from "$lib/openai"

export async function POST(request: Request) {
  const body = await request.json()

  try {
    const summary = await summarize(body.chapter)

    return NextResponse.json({
      summary: summary[0].message?.content ?? "",
      choices: summary,
    })
  } catch (e) {
    console.log(e)
  }
}

export const runtime = "edge"

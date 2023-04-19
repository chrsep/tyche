import { NextResponse } from "next/server"
import { summarize } from "$lib/openai"

export async function POST(request: Request) {
  const body = await request.json()

  const summary = await summarize(
    body.currentSummary,
    body.lastParagraph,
    body.currentParagraph
  )

  return NextResponse.json({
    summary: summary[0].message?.content ?? "",
    choices: summary,
  })
}

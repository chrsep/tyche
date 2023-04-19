"use client"

import { useState } from "react"
import { aws } from "@aws-sdk/util-endpoints/dist-types/lib"
import { postInsuranceSummarize } from "$lib/api"

interface Props {
  sentences: string[]
}

export default function ChatBox({ sentences }: Props) {
  const [index, setIndex] = useState(0)
  const [currentSummary, setCurrentSummary] = useState("")

  const handleSummarize = async () => {
    const lastParagraph =
      index > 0 ? sentences[index - 1] : "You haven't read anything yet."
    const result = await postInsuranceSummarize(
      currentSummary,
      lastParagraph,
      sentences[index]
    )

    setCurrentSummary(result.summary)
    setIndex(index + 1)
  }

  return (
    <div className={"p-6 bg-white border rounded-xl flex-1 prose"}>
      <h2>Summarize</h2>

      <h3>Current Paragraph</h3>
      <p>{sentences[index]}</p>

      <h3>Current Summary</h3>
      <p>{currentSummary}</p>

      <button
        className={"border p-3 bg-gray-100 mt-8 rounded shadow"}
        onClick={handleSummarize}
      >
        Summarize sentence number {index + 1}
      </button>
    </div>
  )
}

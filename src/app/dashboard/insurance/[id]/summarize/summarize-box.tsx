"use client"

import { useState } from "react"
import { aws } from "@aws-sdk/util-endpoints/dist-types/lib"
import { postInsuranceSummarize } from "$lib/api"

interface Props {
  text: string
}

export default function SummarizeBox(props: Props) {
  const [chapter, setChapter] = useState(0)
  const [summarization, setSummarization] = useState("")

  const textByChapter = props.text.split("BAB ").slice(1)
  const titles = textByChapter.map((t) => t.split("Pasal")[0])

  const handleSummarize = async () => {
    const text = textByChapter[chapter]
    // remove duplicate whitespaces
    const textWithoutDuplicateWhitespaces = text.replace(/\s+/g, " ")
    //remove duplicaate newlines
    const textWithoutDuplicateNewlines =
      textWithoutDuplicateWhitespaces.replace(/\n+/g, "\n")
    const result = await postInsuranceSummarize(textWithoutDuplicateNewlines)
    setSummarization(result.summary)
  }

  return (
    <div className={"px-6 py-3"}>
      <label
        htmlFor="location"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Location
      </label>
      <select
        id="location"
        name="location"
        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        defaultValue="Canada"
        value={chapter}
        onChange={(e) => setChapter(parseInt(e.target.value))}
      >
        {titles.map((t, i) => (
          <option key={t} value={i}>
            {t}
          </option>
        ))}
      </select>

      <div className={"prose bg-white p-3 border rounded-lg mt-3"}>
        <h4>Summarization</h4>

        {summarization}
      </div>

      <button
        type="button"
        className="w-full mt-4 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={handleSummarize}
      >
        Summarize
      </button>
    </div>
  )
}

import { cache } from "react"
import { findInsuranceFile } from "$lib/db"
import { loadInsuranceFile } from "$lib/insurance"
import SummarizeBox from "./summarize-box"

const getInsuranceSentences = cache(async (id: string) => {
  const insurance = await findInsuranceFile(id)
  if (!insurance) return null

  const file = await loadInsuranceFile(insurance)
  return {
    title: insurance.name,
    text: file,
  }
})

interface Props {
  params: { id: string }
}

export default async function Summarize(props: Props) {
  const result = await getInsuranceSentences(props.params.id)

  if (result === null) return <div>Insurance not found</div>

  return <SummarizeBox text={result.text} />
}

function Select() {
  return (
    <div>
      <label
        htmlFor="location"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Location
      </label>
      <select
        id="location"
        name="location"
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        defaultValue="Canada"
      >
        <option>United States</option>
        <option>Canada</option>
        <option>Mexico</option>
      </select>
    </div>
  )
}

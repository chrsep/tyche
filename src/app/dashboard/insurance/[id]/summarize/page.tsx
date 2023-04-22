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

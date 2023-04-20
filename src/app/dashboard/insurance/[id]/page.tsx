import ChatBox from "./chat-box"
import { cache } from "react"
import { findInsuranceFile } from "$lib/db"
import { loadInsuranceFile } from "$lib/insurance"

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

async function Insurance(props: Props) {
  const result = await getInsuranceSentences(props.params.id)

  if (result === null) return <div>Insurance not found</div>

  return (
    <ChatBox id={props.params.id} title={result.title} text={result.text} />
  )
}

export default Insurance

import { findInsuranceFile, loadInsuranceFile } from "$lib/insurance"
import { ID } from "$lib/language"
import ChatBox from "./chat-box"
import { cache } from "react"

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
    <div className={"flex gap-16 bg-gray-100 w-full h-full"}>
      <ChatBox title={result.title} text={result.text} />
    </div>
  )
}

export default Insurance

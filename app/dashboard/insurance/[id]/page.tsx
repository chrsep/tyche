import { findInsuranceFile, loadInsuranceFile } from "$lib/insurance"
import { ID } from "$lib/language"
import ChatBox from "./chat-box"

interface Props {
  params: { id: string }
}

async function Insurance(props: Props) {
  const insurance = await findInsuranceFile(props.params.id)

  if (!insurance) return <div>Insurance not found</div>

  const file = await loadInsuranceFile(insurance)
  const sentences = await ID.splitSentence(file).splice(0, 20)

  return (
    <div className={"p-8 flex gap-16 bg-gray-100 w-full"}>
      <div className={"prose !max-w-sm flex-shrink-0"}>
        <h1>{insurance.name}</h1>

        <div>
          {sentences.map((s) => (
            <p key={s}>{s}</p>
          ))}
        </div>
      </div>

      <ChatBox sentences={sentences} />
    </div>
  )
}

export default Insurance

import { findInsuranceFile, loadInsuranceFile } from "$lib/insurance"
import { ID } from "$lib/language"

interface Props {
  params: { id: string }
}

async function Insurance(props: Props) {
  const insurance = await findInsuranceFile(props.params.id)

  if (!insurance) return <div>Insurance not found</div>

  const file = await loadInsuranceFile(insurance)
  const sentences = await ID.splitSentence(file)

  return (
    <div className={"prose p-8"}>
      <h1>{insurance.name}</h1>

      <div>
        {sentences.map((s) => (
          <p key={s}>{s}</p>
        ))}
      </div>
    </div>
  )
}

export default Insurance

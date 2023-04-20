import { ReactNode } from "react"
import Navigation from "./navigation"
import { findInsuranceFile } from "$lib/db"

interface Props {
  params: { id: string }
  children: ReactNode
}

async function Insurance(props: Props) {
  const result = await findInsuranceFile(props.params.id)

  if (result === null) return <div>Insurance not found</div>

  return (
    <div className={"bg-gray-100 w-full h-full"}>
      <div className={"p-6 bg-white border-b"}>
        <h1 className={"font-bold mb-4"}>{result.name}</h1>
        <Navigation id={props.params.id} />
      </div>

      {props.children}
    </div>
  )
}

export default Insurance

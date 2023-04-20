import FileUpload from "./file-upload"
import { getServerSession } from "next-auth"
import { authOptions } from "$pages/api/auth/[...nextauth]"
import Link from "next/link"
import { findInsuranceFiles } from "$lib/db";

export default async function Home() {
  return (
    <div className={"prose p-8"}>
      <h1 className={"bg-gray-50 text-red-700"}>Welcommen</h1>

      <FileUpload />

      {/* @ts-expect-error Server Component */}
      <InsuranceList />
    </div>
  )
}

async function InsuranceList() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) return null

  const files = await findInsuranceFiles(session.user.email)

  return (
    <ul>
      {files.map((f) => {
        return (
          <li key={f.id}>
            <Link href={`/dashboard/insurance/${f.id}`}>{f.name}</Link>
          </li>
        )
      })}
    </ul>
  )
}

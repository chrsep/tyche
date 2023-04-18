"use client"
import { axios, uploadInsuranceFile, uploadS3File } from "$lib/api"
import { ChangeEventHandler } from "react"

export default function Home() {
  const handleUploadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const result = await uploadInsuranceFile(file)
    const { data } = await uploadS3File(result.uploadURL, file)
  }

  return (
    <div className={"prose p-8"}>
      <h1 className={"bg-gray-50 text-red-700"}>Home</h1>

      <input type="file" onChange={handleUploadFile} />
    </div>
  )
}

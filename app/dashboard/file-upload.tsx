"use client"
import { axios, uploadInsuranceFile, uploadS3File } from "$lib/api"
import { ChangeEventHandler } from "react"
import { useRouter } from "next/navigation";

export default function FileUpload() {
  const router = useRouter()

  const handleUploadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const result = await uploadInsuranceFile(file)
    await uploadS3File(result.uploadURL, file)
    router.refresh()
  }

  return <input type="file" onChange={handleUploadFile} />
}

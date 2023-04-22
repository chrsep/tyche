"use client"
import { uploadInsuranceFile } from "$lib/api"
import { ChangeEventHandler } from "react"
import { useRouter } from "next/navigation"

export default function FileUpload() {
  const router = useRouter()

  const handleUploadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    await uploadInsuranceFile(file)
    router.refresh()
  }

  return <input type="file" onChange={handleUploadFile} />
}

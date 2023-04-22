"use client"
import { uploadInsuranceFile } from "$lib/api"
import { ChangeEventHandler, useState } from "react"
import { useRouter } from "next/navigation"

export default function FileUpload() {
  const router = useRouter()

  const [file, setFile] = useState<File | null>(null)

  const handleUploadFile = async () => {
    if (!file) return

    await uploadInsuranceFile(file)
    router.refresh()
  }

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files?.[0] ?? null)
        }}
      />
      <button onClick={handleUploadFile}>Upload</button>
    </div>
  )
}

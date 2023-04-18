import redaxios from "redaxios"

export const axios = redaxios.create({
  baseURL: "/api",
})

export async function uploadInsuranceFile(file: File) {
  const response = await axios.post<{
    uploadURL: string
  }>("/insurance/upload", {
    type: file.type,
    name: file.name,
  })
  return response.data
}

export async function uploadS3File(uploadURL: string, file: File) {
  const response = await axios.put(uploadURL, file)
  return response.data
}

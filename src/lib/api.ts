import redaxios from "redaxios"
import { CreateChatCompletionResponseChoicesInner } from "openai"

export const axios = redaxios.create({
  baseURL: "/api",
})

export async function uploadInsuranceFile(file: File) {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("name", file.name)
  formData.append("type", file.type)

  const response = await axios.post<{
    uploadURL: string
  }>("/insurance/upload", formData)
  return response.data
}

export async function uploadS3File(uploadURL: string, file: File) {
  const response = await axios.put(uploadURL, file)
  return response.data
}

export async function postInsuranceSummarize(chapter: string) {
  const response = await axios.post<{
    summary: string
    choices: CreateChatCompletionResponseChoicesInner[]
  }>("/insurance/summarize", { chapter })
  return response.data
}

export async function postInsuranceChat(
  id: string,
  messages: Array<{
    role: "user" | "assistant"
    content: string
  }>
) {
  const response = await axios.post<{
    summary: string
    choices: CreateChatCompletionResponseChoicesInner[]
  }>("/insurance/chat", {
    id,
    messages,
  })
  return response.data
}

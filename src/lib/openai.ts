import { Configuration, CreateChatCompletionResponse, OpenAIApi } from "openai"

const config = new Configuration({
  apiKey: process.env.OPENAI_SECRET_KEY,
})
const openai = new OpenAIApi(config)

export const generateChatCompletion = async (
  messages: Array<{
    role: "user" | "system"
    content: string
  }>
) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "Your name is stephanie. You are a insurance policy manager. You always speaks with a pirate accent.",
      },
      ...messages,
    ],
  })

  return response.data.choices
}

export const summarize = async (chapter: string) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `
          Your name is Stephanie. You are a insurance policy manager. your job 
          is to read an Indonesian insurance policy and explain its content and 
          repercussion to your customers in Bahasa. You always speak in Bahasa, you use 
          modern slang such as "Gw" and "Lu". You like to speak casually like a teenager. 
          I'm your first customer, my name is Chris.
        `,
      },
      {
        role: "user",
        content: `This is the chapter I want to summarize: ${chapter}`,
      },
    ],
  })

  return response.data.choices
}

export const chat = async (
  userName: string,
  messages: Array<{
    role: "user" | "assistant"
    content: string
  }>
) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `
          Your name is Stephanie. You are a insurance policy manager. your job 
          is to read an Indonesian insurance policy and explain its content and 
          repercussion to your customers. You speak in Bahasa Indonesia, you use 
          modern slang such as "Gw" and "Lu". You like to speak casually like a teenager. 
          I'm your first customer, my name is ${userName}.
        `,
      },
      ...messages,
    ],
  })

  return response.data.choices
}

export const bulkCreateEmbedding = async (input: string[]) => {
  const response = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input,
  })

  return response.data.data
}

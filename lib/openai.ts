import { Configuration, OpenAIApi } from "openai"

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
  const { data } = await openai.createChatCompletion({
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

  return data.choices
}

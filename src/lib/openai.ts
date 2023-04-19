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

export const summarize = async (
  currentSummary: string,
  lastParagraph: string,
  currentParagraph: string
) => {
  const { data } = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `
          Your name is Stephanie. You are a insurance policy manager. Your current job is to 
          read an indonesian insurance policy paragraph by paragraph and summarize it in english. 
          You output bullet points of data that you find important. Always Includes or modify you previous note. You always speaks with a pirate accent.
        `,
      },
      {
        role: "system",
        content: `This is the note that you currently have: ${currentSummary}`,
      },
      {
        role: "system",
        content: `This is the last paragraph that you read: ${lastParagraph}`,
      },
      {
        role: "system",
        content: `This is the current paragraph that you are reading: ${currentParagraph}`,
      },
      {
        role: "user",
        content: `What should you write in your note? Write the full paragraph if you think it is incomplete.`,
      },
    ],
  })

  return data.choices
}

export const interviewInsurance = async (
  insurance: string,
  userName: string,
  messages: Array<{
    role: "user" | "assistant"
    content: string
  }>
) => {
  const { data } = await openai.createChatCompletion({
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
      // {
      //   role: "user",
      //   content: `You will be basing your answers according to the following insurance policy file: ${insurance}`,
      // },
      ...messages,
    ],
  })

  return data.choices
}

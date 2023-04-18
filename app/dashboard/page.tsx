import { getServerSession } from "next-auth"
import { authOptions } from "$pages/api/auth/[...nextauth]"
import { generateChatCompletion } from "$lib/openai"

async function welcomeMessage() {
  const session = await getServerSession(authOptions)

  try {
    const choices = await generateChatCompletion([
      {
        role: "user",
        content: `Hello, my name is ${session?.user?.name}. How are you?`,
      },
    ])
    return choices?.[0]?.message?.content
  } catch (e) {
    console.error(e)

    return "something went wrong"
  }
}

export default async function Home() {
  const message = await welcomeMessage()

  return (
    <div className={"prose p-8"}>
      <h1 className={"bg-gray-50 text-red-700"} >Home</h1>
      <p>{message}</p>
    </div>
  )
}

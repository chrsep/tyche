"use client"

import { useState } from "react"
import { useImmer } from "use-immer"
import clsx from "clsx"
import { postInsuranceChat } from "$lib/api"

interface Props {
  id: string
  title: string
  text: string
}

export default function ChatBox({ title, text, id }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useImmer<
    Array<{
      role: "user" | "assistant"
      content: string
    }>
  >([])

  return (
    <div className={"w-full h-full bg-gray-100"}>
      <h1 className={"mb-6 font-bold p-6 border-b bg-white"}>{title}</h1>

      <div className={"px-3"}>
        {messages.map((m) => (
          <p
            key={m.content}
            className={clsx(
              m.role === "user" &&
                "mb-4 bg-blue-600 text-white rounded-lg p-3 mr-16 sm:mr-auto max-w-md",
              m.role === "assistant" &&
                "mb-4 bg-green-600 text-white rounded-lg p-3 ml-16 sm:ml-auto max-w-md"
            )}
          >
            {m.content}
          </p>
        ))}

        {isLoading && (
          <p
            className={clsx(
              "mb-4 bg-green-600 text-white/70 rounded-lg p-3 ml-16 sm:ml-auto max-w-md animate-pulse"
            )}
          >
            Bot is typing...
          </p>
        )}

        <MessageBox
          onSubmit={async (content) => {
            setMessages((draft) => {
              draft.push({
                role: "user",
                content,
              })
            })
            setIsLoading(true)
            const response = await postInsuranceChat(id, [
              ...messages,
              {
                role: "user",
                content,
              },
            ])
            setIsLoading(false)
            setMessages((draft) => {
              draft.push({
                role: "assistant",
                content: response.summary,
              })
            })
          }}
        />
      </div>
    </div>
  )
}

function MessageBox(props: { onSubmit: (text: string) => void }) {
  const [message, setMessage] = useState("")

  const handleSubmit = () => {
    props.onSubmit(message)
    setMessage("")
  }

  return (
    <div className="flex items-start space-x-4 w-full">
      <div className="flex-shrink-0">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1">
        <form
          action="#"
          className="relative"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 bg-white">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              rows={3}
              name="comment"
              id="comment"
              className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Add your comment..."
              defaultValue={""}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex-shrink-0 ml-auto">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

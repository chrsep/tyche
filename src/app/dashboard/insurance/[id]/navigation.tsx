"use client"

import clsx from "clsx"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link";

interface Props {
  id: string
}

export default function Navigation({ id }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  const tabs = [
    {
      name: "Chat",
      href: `/dashboard/insurance/${id}`,
      current: pathname === `/insurance/${id}`,
    },
    {
      name: "Summarize",
      href: `/dashboard/insurance/${id}/summarize`,
      current: pathname === `/insurance/${id}/summarize`,
    },
  ]


  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          value={pathname ?? ""}
          onChange={(e) => {
            router.push(e.target.value)
          }}
        >
          {tabs.map((tab) => (
            <option key={tab.href} value={tab.href}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={clsx(
                tab.current
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-500 hover:text-gray-700",
                "rounded-md px-3 py-2 text-sm font-medium"
              )}
              aria-current={tab.current ? "page" : undefined}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

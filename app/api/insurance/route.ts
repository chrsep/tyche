import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "$pages/api/auth/[...nextauth]"
import { findInsurancFilee } from "$lib/insurance"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.redirect("/auth/login")
  }

  const insuranceFiles = await findInsurancFilee(session.user.email)

  return NextResponse.json(insuranceFiles ?? [])
}

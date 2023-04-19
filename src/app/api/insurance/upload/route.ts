import { authOptions } from "../../../../pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { findUserByEmail } from "../../../../lib/user"
import { generateFileUploadURL } from "../../../../lib/file-storage"
import { saveInsuranceFile } from "../../../../lib/insurance"

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.redirect("/auth/login")
  }
  const user = await findUserByEmail(session.user.email)
  if (!user) {
    return NextResponse.redirect("/auth/login")
  }

  const body = await request.json()

  const insuranceFile = await saveInsuranceFile(user.id, body.type, body.name)

  const uploadURL = await generateFileUploadURL(
    insuranceFile.objectKey,
    body.type
  )

  return NextResponse.json({ uploadURL: uploadURL })
}

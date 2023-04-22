import { authOptions } from "$pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { findUserByEmail } from "$lib/user"
import { generateFileUploadURL, uploadFile } from "$lib/file-storage"
import { saveInsuranceFile } from "$lib/db"

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.redirect("/auth/login")
  }
  const user = await findUserByEmail(session.user.email)
  if (!user) {
    return NextResponse.redirect("/auth/login")
  }

  const body = await request.formData()
  const file = (await body.get("file")) as File | null
  const name = (await body.get("name")) as string | null
  const type = (await body.get("type")) as string | null

  if (!file || !name || !type) {
    return NextResponse.json({
      success: false,
    })
  }

  const insuranceFile = await saveInsuranceFile(user.id, type, name)
  await uploadFile(insuranceFile.objectKey, file)

  // const uploadURL = await generateFileUploadURL(
  //   insuranceFile.objectKey,
  //   body.type
  // )

  return NextResponse.json({
    success: true,
  })
}

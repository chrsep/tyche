import { authOptions } from "$pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { findUserByEmail } from "$lib/user"
// @ts-ignore
import pdf from "pdf-parse/lib/pdf-parse"
import { ID } from "$lib/language"
import { bulkCreateEmbedding } from "$lib/openai"

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

  const buffer = await file.arrayBuffer()
  const pdfText = await pdf(buffer)

  const bab = pdfText.text.split("BAB").map((c: string) => {
    const title = c.split("\n")[0] + " " + c.split("\n")[1]

    const pasal = c.split("Pasal")

    return {
      title,
      pasal,
    }
  })
  const sentences = ID.splitSentence(pdfText.text)
  const embeddings = await bulkCreateEmbedding(sentences)

  // await uploadFile(insuranceFile.objectKey, file)
  // await updateInsuranceFileContent(insuranceFile.id, pdfText.text)

  // const uploadURL = await generateFileUploadURL(
  //   insuranceFile.objectKey,
  //   body.type
  // )

  return NextResponse.json({
    success: true,
  })
}

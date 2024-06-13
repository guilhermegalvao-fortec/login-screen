export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: Request) {
  const data = {
    message: "Sucesso!"
  }
  return Response.json({ data })
}
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  // Enable draft mode
  draftMode().enable()

  // Redirect to the path from the query parameter
  redirect(searchParams.get('redirect') || '/')
}

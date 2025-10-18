import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  // Disable draft mode
  draftMode().disable()

  // Redirect to the homepage
  redirect('/')
}

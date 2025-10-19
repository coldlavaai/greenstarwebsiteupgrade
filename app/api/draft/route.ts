import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  // Check for secret to confirm this is a legitimate request
  // This prevents random visitors from enabling draft mode
  if (!secret || secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new NextResponse('Invalid token', { status: 401 })
  }

  // Enable draft mode
  draftMode().enable()

  // Redirect to the path from the query parameter
  redirect(searchParams.get('redirect') || '/')
}

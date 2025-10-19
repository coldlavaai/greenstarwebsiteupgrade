import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Optional: Verify the request is from Sanity
    const secret = request.nextUrl.searchParams.get('secret')
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // Revalidate the homepage and any other paths
    revalidatePath('/')

    console.log('✅ Revalidated homepage after Sanity webhook')

    return NextResponse.json({
      revalidated: true,
      now: Date.now()
    })
  } catch (error) {
    console.error('❌ Error revalidating:', error)
    return NextResponse.json({
      message: 'Error revalidating',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

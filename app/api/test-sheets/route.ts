import { NextRequest, NextResponse } from 'next/server'
import { appendToSheet } from '@/lib/googleSheets'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Testing Google Sheets connection...')
    console.log('Has GOOGLE_SERVICE_ACCOUNT_EMAIL:', !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)
    console.log('Has GOOGLE_PRIVATE_KEY:', !!process.env.GOOGLE_PRIVATE_KEY)
    console.log('Email value:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)
    console.log('Key preview:', process.env.GOOGLE_PRIVATE_KEY?.substring(0, 50))

    // Try to append a test row
    const result = await appendToSheet({
      name: 'API Test User',
      email: 'test@api.test',
      phone: '00000000000',
      postcode: 'TEST',
      message: 'API test submission',
    })

    return NextResponse.json({
      success: result.success,
      error: result.error,
      hasEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      hasKey: !!process.env.GOOGLE_PRIVATE_KEY,
      keyPreview: process.env.GOOGLE_PRIVATE_KEY?.substring(0, 50),
      fullResult: result,
    })
  } catch (error) {
    console.error('Test endpoint error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 })
  }
}

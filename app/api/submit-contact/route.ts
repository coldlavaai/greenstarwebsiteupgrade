import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import { Resend } from 'resend'

// Initialize Sanity client with write access (only if configured)
const sanityClient = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
}) : null

// Initialize Resend for email (only if configured)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, postcode, message } = body

    // Validate required fields
    if (!name || !email || !phone || !postcode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Split name into first and last name for Google Sheets
    const nameParts = name.trim().split(' ')
    const first_name = nameParts[0] || name
    const last_name = nameParts.slice(1).join(' ') || ''

    // Format timestamp for Google Sheets (UK format: DD/MM/YYYY HH:mm)
    const now = new Date()
    const time_of_request = now.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(',', '')

    // Send to Google Sheets via VAPI tool
    try {
      const vapiResponse = await fetch('https://api.vapi.ai/tool/a990cb5d-d6e8-4ed7-a245-215f22654d6a/call', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer bb0b198b-1a8f-4675-bdf8-8a865fc5d68a',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name,
          last_name,
          mobile: phone,
          email,
          postcode,
          time_of_request,
          notes: message || 'Contact form submission - no message provided',
        }),
      })

      if (vapiResponse.ok) {
        console.log('✅ Form submission saved to Google Sheets')
      } else {
        console.error('❌ Failed to save to Google Sheets:', await vapiResponse.text())
      }
    } catch (vapiError) {
      console.error('❌ Error sending to Google Sheets:', vapiError)
      // Don't fail the request if Google Sheets fails
    }

    // 2. Save submission to Sanity for record-keeping (if configured)
    let submission: any = null
    let emailSettings: any = null

    if (sanityClient) {
      submission = await sanityClient.create({
        _type: 'formSubmission',
        name,
        email,
        phone,
        message: message || '',
        submittedAt: new Date().toISOString(),
        status: 'new',
      })

      console.log('✅ Form submission saved to Sanity:', submission._id)

      // 3. Fetch email settings from Sanity
      emailSettings = await sanityClient.fetch(`*[_type == "emailSettings"][0]{
        notificationEmails,
        emailSubject,
        enableNotifications
      }`)
    }

    // 4. Send email notifications if enabled
    if (resend && emailSettings?.enableNotifications && emailSettings?.notificationEmails?.length > 0) {
      const recipientEmails = emailSettings.notificationEmails.map((item: any) => item.email)
      const subject = emailSettings.emailSubject || 'New Contact Form Submission - GreenStar Solar'

      try {
        await resend.emails.send({
          from: 'GreenStar Solar <onboarding@resend.dev>', // You'll update this with your domain
          to: recipientEmails,
          subject: subject,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #8cc63f 0%, #6fa832 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
              </div>

              <div style="background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0;">
                <h2 style="color: #333; margin-top: 0;">Contact Details</h2>

                <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                  <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                  <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                  <p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
                  <p style="margin: 10px 0;"><strong>Postcode:</strong> ${postcode}</p>
                </div>

                ${message ? `
                  <div style="background: white; padding: 20px; border-radius: 8px;">
                    <h3 style="color: #333; margin-top: 0;">Message</h3>
                    <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                  </div>
                ` : ''}

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                  <p style="color: #666; font-size: 14px; margin: 0;">
                    Submitted: ${new Date().toLocaleString('en-GB', {
                      dateStyle: 'full',
                      timeStyle: 'short'
                    })}
                  </p>
                  ${submission?._id ? `
                    <p style="color: #666; font-size: 14px; margin: 10px 0 0 0;">
                      <a href="${process.env.NEXT_PUBLIC_SITE_URL}/studio/structure/formSubmission;${submission._id}"
                         style="color: #8cc63f; text-decoration: none;">
                        View in Sanity Studio →
                      </a>
                    </p>
                  ` : ''}
                </div>
              </div>

              <div style="background: #333; padding: 20px; text-align: center;">
                <p style="color: #999; margin: 0; font-size: 12px;">
                  GreenStar Solar - Contact Form Notification
                </p>
              </div>
            </div>
          `,
        })

        console.log(`✅ Email notifications sent to: ${recipientEmails.join(', ')}`)
      } catch (emailError) {
        console.error('❌ Error sending email:', emailError)
        // Don't fail the whole request if email fails
        // The submission is already saved to Sanity
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      submissionId: submission?._id || 'not-recorded',
    })

  } catch (error) {
    console.error('❌ Error processing form submission:', error)
    return NextResponse.json(
      {
        error: 'Failed to process form submission',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

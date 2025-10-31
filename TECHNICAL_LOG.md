# GreenStar Solar - Technical Implementation Log

**Project:** GreenStar Solar Website Redesign
**Repository:** https://github.com/coldlavaai/greenstarwebsiteupgrade
**Live Site:** https://greenstarwebsiteupgrade.vercel.app/
**Completed:** October 31, 2025

---

## 📁 Project Structure

```
greenstarwebsiteupgrade-latest/
├── app/                          # Next.js 14 App Router
│   ├── (pages)/                 # Page routes
│   │   ├── page.tsx             # Homepage
│   │   ├── solar-panels-home/
│   │   ├── solar-panels-business/
│   │   ├── battery-storage-home/
│   │   ├── battery-storage-business/
│   │   ├── ev-charging/
│   │   ├── gallery/
│   │   ├── case-studies/
│   │   ├── privacy-policy/
│   │   ├── cookie-policy/
│   │   └── terms/
│   ├── api/                     # API routes
│   │   ├── submit-contact/      # Contact form handler
│   │   ├── test-sheets/         # Google Sheets test endpoint
│   │   ├── revalidate/          # ISR revalidation
│   │   └── draft/              # Draft mode
│   └── studio/                  # Sanity Studio
├── components/                  # React components
│   ├── CookieConsent.tsx        # GDPR cookie banner
│   ├── VapiWidget.tsx           # Sophie AI chat widget
│   ├── ContactForm.tsx          # Contact form component
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Testimonials.tsx
│   ├── FAQ.tsx
│   └── ...
├── lib/                         # Utility libraries
│   ├── googleSheets.ts          # Google Sheets API integration
│   ├── sanity.ts                # Sanity client
│   └── utils.ts
├── sanity/                      # Sanity CMS schemas
│   ├── schemas/
│   │   ├── formSubmission.ts
│   │   ├── emailSettings.ts
│   │   └── ...
│   └── sanity.config.ts
├── public/                      # Static assets
└── styles/                      # Global styles
```

---

## 🔧 Core Technologies

### Framework & Build
- **Next.js:** 14.x (App Router)
- **React:** 18.x
- **TypeScript:** 5.x
- **Tailwind CSS:** 3.x

### Hosting & Deployment
- **Vercel:** Serverless deployment
- **Git:** GitHub repository
- **CI/CD:** Automatic deployments on push to main

### Content Management
- **Sanity.io:** Headless CMS
- **Sanity Studio:** v3 (embedded at /studio)

### Integrations
- **Google Sheets API:** Form submissions (googleapis v164)
- **VAPI:** AI chat widget
- **Resend:** Email notifications

---

## 🔌 API Integrations

### 1. Google Sheets Integration

**File:** `lib/googleSheets.ts`
**Purpose:** Direct form submissions to Google Sheets

**Configuration:**
- Spreadsheet ID: `1uKmU_phI7b6TArPSW7Ks5PV-snggG5KDy5QumIcuRdk`
- Sheet Name: `Sheet1`
- Service Account: `claude-code-automation@claude-code-access-475710.iam.gserviceaccount.com`

**Column Mapping:**
```
A: First Name
B: Last Name
C: Mobile (Phone)
D: Email
E: Postcode
F: Time of Request (Timestamp)
G: Notes (Message)
H: Source (hardcoded: "Website Contact Form")
```

**Authentication:**
- Uses Google Service Account with JSON key credentials
- Private key stored in Vercel environment variable
- Scopes: `https://www.googleapis.com/auth/spreadsheets`

**Implementation Notes:**
- Timestamp format: UK (DD/MM/YYYY HH:mm)
- Name splitting: First word = First Name, rest = Last Name
- Fallback behavior: Logs warning if credentials missing, doesn't fail request

### 2. VAPI AI Chat Widget

**File:** `components/VapiWidget.tsx`
**Purpose:** Sophie AI chat assistant

**Configuration:**
- Assistant ID: `cb76e1bc-dc2d-4ea8-84a1-c17499ed6387`
- API Key: Stored in environment variable
- Widget positioned: bottom-right, above cookie banner

**Features:**
- Voice + text chat
- Custom branding (GreenStar colors)
- Auto-initialization on page load
- Cookie consent integration

**Implementation:**
```typescript
const WIDGET_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_VAPI_API_KEY || '[fallback]',
  assistant: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || '[fallback]',
  title: 'Chat with Sophie',
  subtitle: 'GreenStar Solar Assistant',
}
```

### 3. Sanity CMS

**Configuration:**
- Project ID: Stored in environment variables
- Dataset: `production`
- Studio path: `/studio`

**Schemas:**
- `formSubmission` - Contact form entries
- `emailSettings` - Email notification config
- Content types for pages, case studies, etc.

**API Routes:**
- `/api/draft` - Draft preview mode
- `/api/disable-draft` - Exit draft mode
- `/api/revalidate` - ISR revalidation webhook

### 4. Resend Email

**File:** `app/api/submit-contact/route.ts`
**Purpose:** Email notifications for form submissions

**Configuration:**
- From: `GreenStar Solar <onboarding@resend.dev>`
- To: Fetched from Sanity `emailSettings`
- Template: HTML with GreenStar branding

**Features:**
- Styled HTML emails
- Includes all form data
- Link to Sanity Studio record
- Graceful failure (doesn't block form submission)

---

## 🔑 Environment Variables

**Location:** Vercel Dashboard → Settings → Environment Variables

### Required Variables

```bash
# Google Sheets Integration
GOOGLE_SERVICE_ACCOUNT_EMAIL=claude-code-automation@claude-code-access-475710.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=[Full RSA private key with newlines]

# VAPI AI Chat
NEXT_PUBLIC_VAPI_API_KEY=bb0b198b-1a8f-4675-bdf8-8a865fc5d68a
NEXT_PUBLIC_VAPI_ASSISTANT_ID=cb76e1bc-dc2d-4ea8-84a1-c17499ed6387

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=[Your Sanity project ID]
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=[Your Sanity write token]
SANITY_API_READ_TOKEN=[Your Sanity read token]
SANITY_REVALIDATE_SECRET=[Secret for webhooks]

# Resend Email
RESEND_API_KEY=[Your Resend API key]

# Site Config
NEXT_PUBLIC_SITE_URL=https://greenstarwebsiteupgrade.vercel.app
```

### Security Notes
- All API keys stored as encrypted environment variables
- `NEXT_PUBLIC_` prefix = exposed to browser (safe for client-side)
- No prefix = server-side only (secure)
- Private key uses actual newlines (not `\n` escape sequences)

---

## 🛠️ Key Files & Their Purpose

### Contact Form Flow

**1. `components/ContactForm.tsx`**
- React Hook Form validation
- Client-side form handling
- Submits to `/api/submit-contact`

**2. `app/api/submit-contact/route.ts`**
- Server-side form handler
- Calls Google Sheets API (`appendToSheet()`)
- Saves to Sanity CMS
- Sends email via Resend
- Returns success/error to client

**3. `lib/googleSheets.ts`**
- `appendToSheet()` function
- Authenticates with Google
- Formats data for sheet columns
- Returns success/error status

### Cookie Consent

**File:** `components/CookieConsent.tsx`

**Features:**
- Shows banner on first visit
- LocalStorage: `cookie-consent` key
- Values: `accepted` | `rejected`
- Styled with GreenStar branding
- Positioned bottom-left (doesn't block chat widget)
- Mobile responsive

**Styling:**
```typescript
position: 'fixed',
bottom: '20px',
left: '20px',
right: '200px',  // Space for chat widget
maxWidth: '1000px',
zIndex: 9999,
```

### VAPI Widget

**File:** `components/VapiWidget.tsx`

**Key Points:**
- Dynamically loads VAPI SDK from CDN
- Initializes on mount
- Cleanup on unmount
- Fallback values if env vars missing
- Custom styling with GreenStar colors

---

## 🐛 Troubleshooting Guide

### Google Sheets Not Working

**Symptoms:** Form submits but data doesn't appear in sheet

**Common Causes:**
1. Service account not shared with sheet (Editor permission)
2. Private key format incorrect in Vercel (needs actual newlines)
3. Sheet tab name mismatch (code expects "Sheet1")
4. Spreadsheet ID incorrect

**Debug Steps:**
1. Check test endpoint: `/api/test-sheets`
2. View Vercel logs for error messages
3. Verify environment variables are set
4. Check sheet sharing settings

**Solution:**
- Share sheet with: `claude-code-automation@claude-code-access-475710.iam.gserviceaccount.com`
- Use CLI to set private key: `vercel env add GOOGLE_PRIVATE_KEY production`
- Paste key with actual newlines (not `\n` strings)

### VAPI Widget Not Loading

**Symptoms:** Chat button doesn't appear

**Common Causes:**
1. Missing environment variables
2. Invalid Assistant ID
3. API key expired/invalid
4. Script blocked by ad blocker

**Debug Steps:**
1. Check browser console for errors
2. Verify env vars in Vercel
3. Test widget at VAPI dashboard
4. Try different browser/incognito mode

**Solution:**
- Check `NEXT_PUBLIC_VAPI_API_KEY` and `NEXT_PUBLIC_VAPI_ASSISTANT_ID`
- Redeploy after changing env vars
- Contact VAPI support if assistant ID invalid

### Email Notifications Not Sending

**Symptoms:** Forms work but no emails received

**Common Causes:**
1. `RESEND_API_KEY` missing or invalid
2. Email settings not configured in Sanity
3. `enableNotifications` set to false
4. Recipient emails not added

**Debug Steps:**
1. Check Vercel logs for email errors
2. Verify Resend API key
3. Check Sanity Studio → Email Settings
4. Test with Resend dashboard

**Solution:**
- Add valid Resend API key to Vercel
- Configure email settings in Sanity Studio
- Verify recipient emails are correct

---

## 📦 Deployment Process

### Automatic Deployments

**Trigger:** Push to `main` branch on GitHub

**Steps:**
1. Vercel detects Git push
2. Runs `npm install`
3. Runs `npm run build`
4. Generates static pages (ISR)
5. Deploys to production
6. Updates DNS (if custom domain)

**Build Time:** ~2-4 minutes

### Manual Deployments

**Method 1: Vercel Dashboard**
1. Go to Deployments tab
2. Click latest deployment
3. Click "..." menu → Redeploy

**Method 2: Vercel CLI**
```bash
vercel --prod
```

### Environment Variable Updates

**Important:** After changing environment variables in Vercel:
1. Variables are encrypted at rest
2. **Requires redeploy** to take effect
3. Use CLI for complex values (like private keys)

---

## 🔒 Security Implementations

### API Key Protection
- All sensitive keys in environment variables
- Server-side only vars never exposed to browser
- No hardcoded credentials in code
- Private key uses Google Service Account (not user OAuth)

### HTTPS & SSL
- Vercel provides automatic SSL
- All traffic encrypted
- HSTS headers enabled

### GDPR Compliance
- Cookie consent banner
- Privacy policy page
- Cookie policy page
- User can reject cookies
- LocalStorage for preference

### Rate Limiting
- Vercel has built-in DDoS protection
- Form submissions not rate-limited (consider adding if spam occurs)

### Input Validation
- React Hook Form validation on client
- Server-side validation in API routes
- Email format validation
- Required field checks

---

## 📈 Performance Optimizations

### Next.js Features Used
- **App Router:** File-based routing
- **Server Components:** Reduced JavaScript bundle
- **Image Optimization:** Next.js Image component
- **Font Optimization:** next/font
- **Static Generation:** Most pages pre-rendered

### Caching Strategy
- Static pages cached at edge (Vercel CDN)
- ISR revalidation for dynamic content
- API routes are dynamic (not cached)

### Bundle Size
- Tailwind CSS purged unused styles
- Dynamic imports for heavy components
- Tree-shaking enabled

---

## 🧪 Testing Endpoints

### Test Google Sheets Integration
```bash
curl https://greenstarwebsiteupgrade.vercel.app/api/test-sheets
```

**Expected Response:**
```json
{
  "success": true,
  "hasEmail": true,
  "hasKey": true,
  "fullResult": {
    "success": true,
    "response": {
      "updatedRows": 1
    }
  }
}
```

### Test Contact Form
1. Go to homepage
2. Fill out contact form
3. Submit
4. Check Google Sheet for new row
5. Check email for notification

---

## 📝 Change Log

### October 31, 2025 - Initial Launch
- ✅ Complete website redesign and build
- ✅ Google Sheets integration configured
- ✅ VAPI chat widget integrated
- ✅ Cookie consent implemented
- ✅ Contact forms on all pages
- ✅ Email notifications setup
- ✅ Sanity CMS configured
- ✅ Security audit completed
- ✅ Legal pages added (Privacy, Cookie, Terms)
- ✅ Mobile responsive design
- ✅ SEO optimization
- ✅ Production deployment

### Key Fixes During Development
1. **Private Key Format Issue**
   - Problem: GOOGLE_PRIVATE_KEY was being escaped by Vercel UI
   - Solution: Used Vercel CLI to set env var with proper newlines

2. **Column Mapping Issue**
   - Problem: Data appearing in wrong Google Sheet columns
   - Solution: Updated `lib/googleSheets.ts` to match actual sheet structure

3. **Cookie Banner Overlap**
   - Problem: Full-width banner blocking chat widget
   - Solution: Made banner narrower with right padding (200px)

4. **Sheet Tab Name**
   - Problem: Code expected "Sheet1", actual tab was different
   - Solution: Updated SHEET_NAME constant to match actual tab

---

## 🔄 Future Maintenance

### Monthly Tasks
- Review Vercel deployment logs
- Check Google Sheets for spam submissions
- Monitor VAPI usage/costs
- Review Resend email delivery rates

### Quarterly Tasks
- Update dependencies (`npm update`)
- Security audit (`npm audit`)
- Review and update content
- Check mobile responsiveness on new devices

### Annually
- Renew SSL certificates (automatic via Vercel)
- Review hosting costs
- Consider feature additions
- Update legal pages

---

## 📞 Developer Contact

**Cold Lava AI Automation**
Oliver Tatler
- Email: oliver@otdm.net
- Phone: +44 151 541 6933
- GitHub: @coldlavaai
- Website: https://coldlava.ai

---

## 🗂️ Additional Documentation Files

- `CLIENT_HANDOVER.md` - Client-facing handover document
- `GOOGLE_SHEETS_SETUP.md` - Google Sheets integration guide
- `VERCEL_ENV_SETUP.md` - Environment variable setup guide
- `README.md` - Project setup and development guide

---

**Last Updated:** October 31, 2025

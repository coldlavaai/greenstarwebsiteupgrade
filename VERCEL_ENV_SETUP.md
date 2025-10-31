# 🔒 URGENT: Vercel Environment Variables Setup

**IMPORTANT:** You need to add environment variables to Vercel to secure your API keys.

## Why This Is Critical

Your VAPI API key was hardcoded in the client-side code. This means **anyone could view your page source and steal your API key**, potentially racking up thousands in API charges.

I've moved the API key to environment variables, but you need to configure them in Vercel.

---

## How to Add Environment Variables in Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click on your **greenstarwebsiteupgrade** project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

### Required Variables:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_VAPI_ASSISTANT_ID` | `cb76e1bc-dc2d-4ea8-84a1-c17499ed6387` | Production, Preview, Development |
| `NEXT_PUBLIC_VAPI_API_KEY` | `bb0b198b-1a8f-4675-bdf8-8a865fc5d68a` | Production, Preview, Development |

**Important:**
- Make sure to select **Production**, **Preview**, AND **Development** for each variable
- Click "Save" after adding each one

### Optional (if you have them):

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID | All |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | All |
| `SANITY_API_WRITE_TOKEN` | Your Sanity write token | All |
| `RESEND_API_KEY` | Your Resend API key | All |

---

## After Adding Variables

1. Go to **Deployments** tab in Vercel
2. Click on the latest deployment
3. Click **Redeploy** (three dots menu → "Redeploy")
4. The site will rebuild with the secure environment variables

---

## How It Works Now

**Before (INSECURE):**
```typescript
const WIDGET_CONFIG = {
  apiKey: 'bb0b198b-1a8f-4675-bdf8-8a865fc5d68a'  // ❌ Visible to everyone!
};
```

**After (SECURE):**
```typescript
const WIDGET_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_VAPI_API_KEY  // ✅ Hidden in server config
};
```

The API key is now **only stored in Vercel's secure environment** and never exposed to the browser.

---

## Fallback Behavior

Don't worry - I added fallbacks so **your site won't break** while you set this up. The widget will continue working with the old values until you add the environment variables. But you should do this ASAP for security.

---

## Need Help?

If you have any issues:
1. Check the Vercel logs for errors
2. Make sure variable names are **exactly** as shown (including `NEXT_PUBLIC_` prefix)
3. Redeploy after adding variables

---

**Estimated time:** 5 minutes
**Priority:** 🔴 HIGH - Do this within 24 hours

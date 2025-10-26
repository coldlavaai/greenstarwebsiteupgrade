# Greenstar Solar - Automated Review Sync Setup Guide

## 📋 Overview

This workflow automatically syncs customer reviews from **Google Business Profile** and **Trustpilot** to your Sanity CMS database every day at 2 AM.

**Workflow Features:**
- ✅ Fetches reviews from both platforms daily
- ✅ Automatically transforms data to match your Sanity schema
- ✅ Prevents duplicate entries
- ✅ Auto-marks 5-star reviews as "featured"
- ✅ Extracts staff mentions (Jack, Jon, Tobias, etc.)
- ✅ Sends notifications when new reviews are added

---

## 🔧 Setup Instructions

### Step 1: Google Business Profile API Setup

#### 1.1 Enable the API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Navigate to **APIs & Services** > **Library**
4. Search for "Google Business Profile API"
5. Click **Enable**

#### 1.2 Create OAuth Credentials
1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client ID**
3. Choose **Web application**
4. Add redirect URI: `https://otdm22.app.n8n.cloud/rest/oauth2-credential/callback`
5. Save the **Client ID** and **Client Secret**

#### 1.3 Find Your Account and Location IDs
```bash
# Use the Google Business Profile API Explorer:
https://developers.google.com/my-business/reference/accountmanagement/rest/v1/accounts/list

# Or use this cURL command (after getting OAuth token):
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  "https://mybusinessaccountmanagement.googleapis.com/v1/accounts"
```

**You need:**
- `GOOGLE_ACCOUNT_ID` (format: `accounts/1234567890`)
- `GOOGLE_LOCATION_ID` (format: `locations/9876543210`)

---

### Step 2: Trustpilot API Setup

#### 2.1 Request API Access
1. Log in to [Trustpilot Business](https://businessapp.b2b.trustpilot.com/)
2. Navigate to **Settings** > **Integrations** > **API**
3. Request API access (may take 1-2 business days for approval)
4. Once approved, you'll receive an **API Key**

#### 2.2 Find Your Business Unit ID
```bash
# Method 1: Check your Trustpilot profile URL
# Example: https://www.trustpilot.com/review/greenstarsolar.co.uk
# Business ID is often derived from the domain

# Method 2: Use the API to search
curl -X GET "https://api.trustpilot.com/v1/business-units/find?name=greenstar+solar" \
  -H "apikey: YOUR_API_KEY"
```

**You need:**
- `TRUSTPILOT_API_KEY`
- `TRUSTPILOT_BUSINESS_ID`

---

### Step 3: Configure n8n Environment Variables

1. Go to your n8n instance: https://otdm22.app.n8n.cloud
2. Navigate to **Settings** > **Environment Variables**
3. Add the following variables:

```bash
# Google Business Profile
GOOGLE_ACCOUNT_ID=accounts/YOUR_ACCOUNT_ID
GOOGLE_LOCATION_ID=locations/YOUR_LOCATION_ID

# Trustpilot
TRUSTPILOT_API_KEY=your_trustpilot_api_key_here
TRUSTPILOT_BUSINESS_ID=your_business_unit_id_here

# Sanity (already set in .env.local)
SANITY_API_WRITE_TOKEN=sktOOK5RKSYRsfYmxKC2ARKG1stbXkXQ8HbjLEuF8xrQqNfVgONR09pxf85BGcX4w50UHg5XHPdwcoq5QcFIkEygzk32YJ6k7I9AbnAnTpn4dGgZdQcl8SU1fgQimQlXGBzFbeC6a123SescukDBRmhDTjeX3sZKTTh3LxyntT216Wp9PKcK

# Optional: Telegram Notifications
TELEGRAM_CHAT_ID=your_telegram_chat_id  # Optional - remove notification node if not needed
```

---

### Step 4: Add Google OAuth Credentials in n8n

1. In n8n, go to **Credentials** > **Add Credential**
2. Select **Google API**
3. Enter:
   - **Client ID**: (from Step 1.2)
   - **Client Secret**: (from Step 1.2)
4. Click **Connect my account** and authorize
5. Save the credential

---

### Step 5: Import the Workflow

#### Option A: Via n8n UI (Recommended)
1. Go to **Workflows** in n8n
2. Click **Import from File**
3. Select: `n8n-review-sync-workflow.json`
4. Click **Save**
5. Activate the workflow

#### Option B: Via n8n API
```bash
cd ~/Documents/greenstar-solar-redesign

curl -X POST "https://otdm22.app.n8n.cloud/api/v1/workflows" \
  -H "X-N8N-API-KEY: $N8N_API_KEY" \
  -H "Content-Type: application/json" \
  -d @n8n-review-sync-workflow.json
```

---

### Step 6: Test the Workflow

1. Open the workflow in n8n
2. Click **Execute Workflow** (manual test run)
3. Check the execution log for:
   - ✅ Successful API calls to Google & Trustpilot
   - ✅ Reviews being transformed
   - ✅ New reviews created in Sanity
4. Verify in Sanity Studio that new reviews appear

---

## 🔍 Troubleshooting

### Google API Returns 403 Forbidden
- **Cause**: API not enabled or OAuth not configured correctly
- **Fix**: Re-check Step 1.1 and 1.2, ensure API is enabled

### Trustpilot Returns 401 Unauthorized
- **Cause**: Invalid API key or Business ID
- **Fix**: Verify API key is active and Business ID is correct

### No New Reviews Created
- **Check**:
  1. Are there actually new reviews since last sync?
  2. Check the "Filter Only New Reviews" node output
  3. Verify Sanity write token is valid

### Duplicate Reviews
- **Cause**: Review IDs changed between syncs
- **Fix**: Review IDs are based on platform IDs which should be stable
- Check the transformation logic in "Transform to Sanity Format" node

---

## 📊 Workflow Schedule

**Default**: Daily at 2:00 AM GMT

**To change**:
1. Open the workflow
2. Edit the "Daily at 2 AM" trigger node
3. Modify the cron expression:
   - Every hour: `0 * * * *`
   - Every 6 hours: `0 */6 * * *`
   - Weekly (Monday 2 AM): `0 2 * * 1`

---

## 🎯 What Gets Synced

### From Google Business Profile:
- ✅ Customer name (or "Google Customer" if anonymous)
- ✅ Star rating (1-5)
- ✅ Review text/comment
- ✅ Review date
- ✅ Staff mentions extracted automatically

### From Trustpilot:
- ✅ Customer display name
- ✅ Star rating (1-5)
- ✅ Review title
- ✅ Review text
- ✅ Review date
- ✅ Business vs Residential auto-detection
- ✅ Staff mentions extracted automatically

### Auto-Generated Fields:
- `_id`: Unique ID based on platform and review ID
- `platform`: "google" or "trustpilot"
- `featured`: Automatically `true` for 5-star reviews
- `staffMentioned`: Array of staff names found in review text
- `customerType`: "residential" or "commercial" (business keyword detection)
- `isPublished`: Always `true`
- `order`: 999 (new reviews go to end, manually adjust if needed)

---

## 🔔 Notifications

The workflow includes a **Telegram notification** node that sends a message when new reviews are added.

**To enable:**
1. Create a Telegram bot via [@BotFather](https://t.me/botfather)
2. Get your chat ID by messaging [@userinfobot](https://t.me/userinfobot)
3. Add `TELEGRAM_CHAT_ID` to n8n environment variables

**To disable:**
Simply delete the "Send Telegram Notification" node from the workflow.

**Alternative notification methods:**
- Email: Replace with **Send Email** node
- Slack: Replace with **Slack** node
- Discord: Replace with **Discord** node

---

## 📝 Manual Review Management

### To manually add a review to Sanity:
```bash
cd ~/Documents/greenstar-solar-redesign

# Use the existing populate script
env SANITY_API_WRITE_TOKEN=sktOOK5RKSYRsfYmxKC2ARKG1stbXkXQ8HbjLEuF8xrQqNfVgONR09pxf85BGcX4w50UHg5XHPdwcoq5QcFIkEygzk32YJ6k7I9AbnAnTpn4dGgZdQcl8SU1fgQimQlXGBzFbeC6a123SescukDBRmhDTjeX3sZKTTh3LxyntT216Wp9PKcK npx tsx scripts/populate-all-48-reviews.ts
```

### To query all reviews:
```bash
curl "https://kpz3fwyf.api.sanity.io/v2024-01-01/data/query/production?query=*%5B_type%20%3D%3D%20%22review%22%5D%20%7C%20order(reviewDate%20desc)%5B0...10%5D%7BcustomerName%2C%20rating%2C%20platform%2C%20reviewDate%7D"
```

---

## 🎉 Success!

Once configured, your reviews will automatically sync every day. You'll receive a notification each time new reviews are added to your Sanity database!

**Next steps:**
1. Display reviews on your Greenstar website
2. Create a reviews page using the Sanity data
3. Add review widgets to service pages
4. Monitor the workflow executions in n8n

---

## 💡 Support

- **n8n Documentation**: https://docs.n8n.io/
- **Google Business Profile API**: https://developers.google.com/my-business
- **Trustpilot API**: https://developers.trustpilot.com/
- **Sanity GROQ**: https://www.sanity.io/docs/groq

---

**Created**: October 22, 2025
**Workflow ID**: Will be assigned after import
**Status**: Ready for configuration

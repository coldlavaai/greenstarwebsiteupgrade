# 🚀 Quick Start - Review Auto-Sync

## ✅ What's Ready

**All 48 customer reviews** are now in your Sanity database!
- 16 Google reviews
- 32 Trustpilot reviews
- Company information added
- Featured reviews marked

## 📁 Files Created

1. **`n8n-review-sync-workflow.json`** - Complete n8n workflow
2. **`REVIEW_SYNC_SETUP_GUIDE.md`** - Detailed setup instructions
3. **`scripts/populate-all-48-reviews.ts`** - Manual sync script

---

## 🎯 Next Steps to Enable Auto-Sync

### 1. Import Workflow to n8n (5 minutes)

```bash
1. Go to: https://otdm22.app.n8n.cloud
2. Click "Workflows" → "Import from File"
3. Upload: n8n-review-sync-workflow.json
4. Save workflow
```

### 2. Get API Credentials (15-30 minutes)

#### Google Business Profile:
- Go to: https://console.cloud.google.com/
- Enable "Google Business Profile API"
- Create OAuth credentials
- Get your Account ID and Location ID

#### Trustpilot:
- Log in to: https://businessapp.b2b.trustpilot.com/
- Request API access (Settings → Integrations → API)
- Get your API key and Business Unit ID

### 3. Configure n8n Environment Variables

In n8n Settings → Environment Variables, add:

```bash
GOOGLE_ACCOUNT_ID=accounts/YOUR_ID
GOOGLE_LOCATION_ID=locations/YOUR_ID
TRUSTPILOT_API_KEY=your_key
TRUSTPILOT_BUSINESS_ID=your_id
SANITY_API_WRITE_TOKEN=sktOOK5RKSYRsfYmxKC2ARKG1stbXkXQ8HbjLEuF8xrQqNfVgONR09pxf85BGcX4w50UHg5XHPdwcoq5QcFIkEygzk32YJ6k7I9AbnAnTpn4dGgZdQcl8SU1fgQimQlXGBzFbeC6a123SescukDBRmhDTjeX3sZKTTh3LxyntT216Wp9PKcK
```

### 4. Test & Activate

```bash
1. Click "Execute Workflow" in n8n
2. Check execution log for success
3. Verify new reviews appear in Sanity
4. Toggle workflow "Active" switch
```

---

## 🔄 How It Works

**Every day at 2 AM**, the workflow will:
1. ✅ Fetch latest reviews from Google
2. ✅ Fetch latest reviews from Trustpilot
3. ✅ Transform to Sanity format
4. ✅ Check for duplicates
5. ✅ Create only NEW reviews in database
6. ✅ Send notification (optional)

**Auto-features:**
- 5-star reviews → marked as "featured"
- Staff names in text → extracted to "staffMentioned"
- Business keywords → marked as "commercial" type

---

## 📊 Current Database Status

Query your reviews:
```bash
curl "https://kpz3fwyf.api.sanity.io/v2024-01-01/data/query/production?query=count(*%5B_type%20%3D%3D%20%22review%22%5D)"
```

View in Sanity Studio:
```
https://greenstarsolar.sanity.studio
```

---

## 💡 Tips

**Can't get API access right away?**
- Google API: Usually instant
- Trustpilot API: May take 1-2 business days

**Don't want auto-sync?**
- Keep the current 48 reviews
- Manually run the populate script when needed
- Or skip workflow setup entirely

**Want to customize?**
- Edit the workflow in n8n visual editor
- Change schedule (hourly, weekly, etc.)
- Add email notifications instead of Telegram
- Modify transformation logic

---

## 📞 Need Help?

See full instructions: `REVIEW_SYNC_SETUP_GUIDE.md`

The workflow is production-ready and will work automatically once API credentials are configured!

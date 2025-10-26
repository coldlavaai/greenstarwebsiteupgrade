# Import Workflow to n8n - 2 Minute Guide

## Super Simple Import (Recommended)

### Step 1: Open n8n
Go to: **https://otdm22.app.n8n.cloud**

### Step 2: Import the Workflow
1. Click **"Workflows"** in the left sidebar
2. Click the **"Import from File"** button (top right)
3. Click **"Select file"**
4. Choose: `n8n-review-sync-workflow.json` (from your greenstar-solar-redesign folder)
5. Click **"Import"**

**That's it!** The workflow is now in your n8n.

---

## Step 3: Configure It (5 minutes)

### Add Environment Variables

1. In n8n, go to: **Settings** (gear icon) → **Environment Variables**
2. Click **"+ Add Variable"** for each of these:

```bash
# Sanity (already have this one)
SANITY_API_WRITE_TOKEN=sktOOK5RKSYRsfYmxKC2ARKG1stbXkXQ8HbjLEuF8xrQqNfVgONR09pxf85BGcX4w50UHg5XHPdwcoq5QcFIkEygzk32YJ6k7I9AbnAnTpn4dGgZdQcl8SU1fgQimQlXGBzFbeC6a123SescukDBRmhDTjeX3sZKTTh3LxyntT216Wp9PKcK

# Google (get these from GOOGLE_API_SETUP.md)
GOOGLE_ACCOUNT_ID=accounts/YOUR_ACCOUNT_ID
GOOGLE_LOCATION_ID=locations/YOUR_LOCATION_ID

# Trustpilot (get these from Trustpilot)
TRUSTPILOT_API_KEY=your_trustpilot_key
TRUSTPILOT_BUSINESS_ID=your_business_id
```

3. Click **"Save"** after adding each variable

### Add Google OAuth Credentials

1. In n8n, go to: **Credentials** (key icon)
2. Click **"+ Add Credential"**
3. Search for and select: **"Google API"**
4. Fill in:
   - **Client ID**: (from Google Cloud Console)
   - **Client Secret**: (from Google Cloud Console)
5. Click **"Connect my account"**
6. Authorize with your Google account
7. Click **"Save"**

---

## Step 4: Test It

1. Open the imported workflow
2. Click **"Execute Workflow"** button (play icon)
3. Watch the execution in real-time
4. Check if reviews appear in Sanity

---

## Step 5: Activate It

1. Toggle the **"Active"** switch at the top right
2. The workflow will now run daily at 2 AM automatically

---

## Troubleshooting

### "Workflow execution failed"
- Check that all environment variables are set correctly
- Verify Google OAuth credentials are connected
- Make sure Trustpilot API key is valid

### No reviews fetched
- Verify your Google Account ID and Location ID are correct
- Check that you have reviews on both platforms
- Test each API node individually (click "Execute node")

### Duplicate nodes error
- The workflow is designed to prevent duplicates
- This is normal and expected behavior

---

## Alternative: Copy-Paste Import

If file import doesn't work:

1. Open `n8n-review-sync-workflow.json` in a text editor
2. Copy the entire JSON content
3. In n8n: **Workflows** → **Import from URL**
4. Click **"Import from Clipboard"**
5. Paste the JSON
6. Click **"Import"**

---

**That's it!** The workflow is now ready to sync your reviews automatically every day.

See `GOOGLE_API_SETUP.md` for getting your Google credentials.

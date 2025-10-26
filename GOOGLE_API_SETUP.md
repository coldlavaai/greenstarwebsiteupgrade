# Google Business Profile API - Quick Setup Guide

## Step 1: Create Google Cloud Project (5 minutes)

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account (same one that manages Greenstar Solar's Google Business Profile)

2. **Create a New Project**
   - Click the project dropdown at the top
   - Click "NEW PROJECT"
   - Project name: "Greenstar Solar Reviews"
   - Click "CREATE"

## Step 2: Enable Google Business Profile API (2 minutes)

1. **In your new project**, go to:
   - Left menu → "APIs & Services" → "Library"

2. **Search for the API**
   - In the search box, type: "Google Business Profile API"
   - Click on "Google Business Profile API"
   - Click the blue "ENABLE" button

## Step 3: Create OAuth Credentials (5 minutes)

1. **Go to Credentials**
   - Left menu → "APIs & Services" → "Credentials"
   - Click "+ CREATE CREDENTIALS" at the top
   - Select "OAuth client ID"

2. **Configure OAuth Consent Screen** (if prompted)
   - Click "CONFIGURE CONSENT SCREEN"
   - Choose "External" (or Internal if you have Google Workspace)
   - Click "CREATE"
   
   **Fill in required fields:**
   - App name: "Greenstar Solar Review Sync"
   - User support email: oliver@otdm.net (or your email)
   - Developer contact: oliver@otdm.net
   - Click "SAVE AND CONTINUE"
   - Skip "Scopes" (click "SAVE AND CONTINUE")
   - Skip "Test users" (click "SAVE AND CONTINUE")
   - Click "BACK TO DASHBOARD"

3. **Create OAuth Client ID**
   - Go back to "Credentials"
   - Click "+ CREATE CREDENTIALS" → "OAuth client ID"
   - Application type: "Web application"
   - Name: "n8n Greenstar Review Sync"
   
   **Authorized redirect URIs** - Click "+ ADD URI" and add:
   ```
   https://otdm22.app.n8n.cloud/rest/oauth2-credential/callback
   ```
   
   - Click "CREATE"

4. **Save Your Credentials**
   - You'll see a popup with:
     - **Client ID** (looks like: 123456789-abc123.apps.googleusercontent.com)
     - **Client secret** (looks like: GOCSPX-abc123xyz789)
   - **COPY BOTH** - you'll need them in n8n!

## Step 4: Find Your Account and Location IDs (5-10 minutes)

### Method 1: Using OAuth Playground (Recommended)

1. **Get an Access Token**
   - Go to: https://developers.google.com/oauthplayground/
   - Click the gear icon (⚙️) in top right
   - Check "Use your own OAuth credentials"
   - Enter your Client ID and Client Secret from Step 3
   - Close settings

2. **Select the API**
   - In the left sidebar, find "Google My Business API v4.9"
   - Check: `https://www.googleapis.com/auth/business.manage`
   - Click "Authorize APIs"
   - Sign in and allow access
   - Click "Exchange authorization code for tokens"

3. **List Your Accounts**
   - In "Step 2", change the request to:
   ```
   GET https://mybusinessaccountmanagement.googleapis.com/v1/accounts
   ```
   - Click "Send the request"
   
   **You'll see a response like:**
   ```json
   {
     "accounts": [
       {
         "name": "accounts/1234567890",
         "accountName": "Greenstar Solar",
         "type": "PERSONAL"
       }
     ]
   }
   ```
   
   **Copy the account ID**: `accounts/1234567890`

4. **List Your Locations**
   - Change the request to (replace with YOUR account ID):
   ```
   GET https://mybusinessbusinessinformation.googleapis.com/v1/accounts/1234567890/locations
   ```
   - Click "Send the request"
   
   **You'll see:**
   ```json
   {
     "locations": [
       {
         "name": "locations/9876543210",
         "title": "Greenstar Solar"
       }
     ]
   }
   ```
   
   **Copy the location ID**: `locations/9876543210`

### Method 2: Using Google Business Profile Dashboard

1. Go to: https://business.google.com/
2. Select your Greenstar Solar location
3. The URL will contain your location ID
4. Format: `https://business.google.com/n/[ACCOUNT_ID]/[LOCATION_ID]/...`

## Step 5: You Now Have Everything You Need!

**Credentials:**
✅ Client ID  
✅ Client Secret  
✅ Account ID (format: `accounts/1234567890`)  
✅ Location ID (format: `locations/9876543210`)

---

## What to Do Next

I'll add these to your n8n workflow automatically once you have them!

Just reply with:
- Client ID
- Client Secret  
- Account ID
- Location ID

And I'll configure everything for you.

---

## Troubleshooting

### "API has not been used in project" error
- Make sure you enabled the API in Step 2
- Wait 2-3 minutes for it to propagate

### "Access denied" error
- Make sure you're signed in with the Google account that owns the business listing
- Check OAuth consent screen is configured

### Can't find my location
- Go to https://business.google.com/ and verify the listing exists
- Make sure you have owner/manager access

---

**Estimated Time**: 15-20 minutes total
**Difficulty**: Easy (just following steps)

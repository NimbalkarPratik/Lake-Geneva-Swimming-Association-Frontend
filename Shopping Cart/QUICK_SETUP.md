# Quick Setup Guide - Google Sheets Integration

## Step 1: Open Google Sheets (You need a Google account - free)

Go to https://sheets.google.com and sign in with your Google account.

Click **+ Create new spreadsheet** and name it: `LGSA Shopping Cart Orders`

## Step 2: Copy Your Sheet ID

The URL will look like: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

Copy the long ID between `/d/` and `/edit` - this is your **SHEET_ID**

---

## Step 3: Deploy Google Apps Script

In your Google Sheet, go to: **Extensions > Apps Script**

A new window opens. Delete any existing code and copy **all** the code from the file in your shopping cart folder: `GoogleAppsScript.gs`

Find this line (~line 8):
```
const SHEET_ID = "YOUR_GOOGLE_SHEET_ID";
```

Replace `YOUR_GOOGLE_SHEET_ID` with the ID you copied in Step 2.

Click **Save** (Ctrl+S or Cmd+S)

---

## Step 4: Deploy as Web App

Click the **Deploy** button (top right)

Click **New deployment**

For Type, select **Web app**

For "Execute as", choose your Google account

For "Who has access", select **Anyone**

Click **Deploy**

Google will show you a warning - click **Allow** to authorize

---

## Step 5: Copy Your Deployment URL

After deployment, you'll see a window with your **Deployment URL**

It looks like: `https://script.google.com/macros/d/DEPLOYMENT_ID/userweb`

**Copy the entire URL** - you'll need this in the next step

---

## Step 6: Provide the URL to Me

Once you have your deployment URL from Step 5, provide it to me and I will:

1. Update your `index.html` file with your webhook URL
2. Verify everything is connected correctly

**That's it! No more manual setup needed.**

---

## Summary

- ✅ GoogleAppsScript.gs - Already created for you
- ✅ Privacy policy page - Already created
- ⏳ Google Sheet & deployment - YOU DO STEPS 1-5 ABOVE
- ⏳ Update index.html - I'LL DO THIS ONCE YOU PROVIDE THE URL

When you're done with steps 1-5 above, paste your deployment URL here and I'll complete the final setup!

# Google Sheets Integration Setup Guide

## Overview
Your shopping cart is already configured to send order data to Google Sheets when customers complete checkout. Follow these steps to set it up.

## Step 1: Create a Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click **+ Create new spreadsheet**
3. Name it: `LGSA Shopping Cart Orders`
4. Copy the **Sheet ID** from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Copy the long alphanumeric ID between `/d/` and `/edit`

## Step 2: Create the Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code
3. Open the file `GoogleAppsScript.gs` from this folder
4. Copy **all the code** and paste it into the Apps Script editor
5. On **line 8**, replace:
   ```
   const SHEET_ID = "YOUR_GOOGLE_SHEET_ID";
   ```
   with your actual Sheet ID from Step 1

6. Click **Save** (Ctrl+S)

## Step 3: Deploy the Web App

1. In Apps Script, click **Deploy** (top right button)
2. Click **New deployment**
3. Select **Type**: Web app
4. Configure:
   - **Execute as**: Your Google Account (the one owning the sheet)
   - **Who has access**: Anyone
5. Click **Deploy**
6. You'll see a **Deployment ID** — click the copy icon next to the URL
7. Copy the entire **web app URL** (should look like):
   ```
   https://script.google.com/macros/d/DEPLOYMENT_ID/userweb
   ```

## Step 4: Update index.html

1. Open `index.html`
2. Find line ~3894 with:
   ```javascript
   const GOOGLE_SHEETS_WEBHOOK_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEBHOOK_URL";
   ```
3. Replace the placeholder with your deployed URL from Step 3:
   ```javascript
   const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/userweb";
   ```
4. Save the file

## Step 5: Test the Integration

1. Go back to your Google Sheet
2. In Apps Script, click **Editor** > select `testWebhook` function
3. Click **Run** (▶ button)
4. Check your Sheet:
   - You should see two new sheets: **Orders** and **Swimmers**
   - Orders sheet should have one test row
   - Swimmers sheet should have the test swimmer data

## What Gets Saved

### Orders Sheet
- **Timestamp**: When the order was placed
- **Order Reference**: Unique ID (LGSA-XXXXXX)
- **Items (JSON)**: Product details and quantities
- **Subtotal**: Price before discount
- **Discount Code**: Applied coupon (if any)
- **Discount Amount**: How much was discounted
- **Fee**: Wise payment fee
- **Total**: Final amount charged
- **Currency**: EUR
- **Payment Method**: Wise or Bank Transfer
- **Swimmer Name**: Contact name from booking form

### Swimmers Sheet
- **Order Reference**: Links to Orders sheet
- **Swimmer Name**: Full name
- **Phone Country**: Country code
- **Phone**: Contact number
- **Address**: Street address
- **City**: City name
- **Province**: State/Province
- **Postal Code**: ZIP/Postal code
- **Heard About Us**: How they found LGSA

## Troubleshooting

### "Google Sheets webhook not configured"
- Check that `GOOGLE_SHEETS_WEBHOOK_URL` in index.html has a real URL (not the placeholder)
- Open browser console (F12) to see the exact payload being sent

### Sheets not appearing
- Run the `testWebhook()` function in Apps Script to create them
- Check the Executions tab in Apps Script for errors

### Data not saving
- Verify your Google Sheet ID is correct in the script (line 8)
- Check that the deployment is set to "Execute as: Your Account"
- Check Apps Script Executions tab for error messages

### "Deployment ID" not shown
- Click the deployment URL copy icon again
- The URL contains your Deployment ID

## Support

For issues:
1. Check the **Executions** tab in Apps Script (click clock icon)
2. Look at error messages
3. Run `testWebhook()` to verify setup
4. Check browser console (F12) for client-side errors

---

## Deployment Checklist

- [ ] Created Google Sheet
- [ ] Copied Sheet ID
- [ ] Pasted Apps Script code
- [ ] Updated Sheet ID in script (line 8)
- [ ] Deployed as Web app
- [ ] Copied deployment URL
- [ ] Updated GOOGLE_SHEETS_WEBHOOK_URL in index.html
- [ ] Ran testWebhook() and verified sheets created
- [ ] Tested real checkout (optional: use WISE_TEST_FULL_DISCOUNT for free testing)

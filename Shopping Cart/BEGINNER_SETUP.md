# 🚀 Complete Beginner's Setup Guide - 100% Automated

Follow these **exact steps** - copy-paste everything. Takes ~10 minutes.

---

## STEP 1: Open Google Sheets

**In a new browser tab, go to:** https://sheets.google.com

**If you don't have a Google account**, create one first (it's free): https://accounts.google.com/signup

---

## STEP 2: Create a New Spreadsheet

On Google Sheets homepage:
- Click the **+** button (or "Create new spreadsheet")
- A new sheet opens
- At the top left, it says "Untitled spreadsheet"
- Click that text and name it: **LGSA Shopping Cart Orders**
- Press Enter
- Wait for it to save (takes a few seconds)

---

## STEP 3: Find Your Sheet ID

Look at the URL in your browser. It looks like this:

```
https://docs.google.com/spreadsheets/d/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/edit#gid=0
```

The **XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX** part is your **Sheet ID**. 

**Copy and save it somewhere** (like in Notepad). You'll need this in STEP 5.

---

## STEP 4: Open Google Apps Script

In your Google Sheet:
- Click **Extensions** (top menu)
- Click **Apps Script**
- A new window opens
- You'll see some default code - **delete all of it**
- Your cursor should be in an empty editor now

---

## STEP 5: Copy the Script Code

**From your shopping cart folder, open this file:**
```
GoogleAppsScript.gs
```

**Copy ALL the code** from that file.

**Back in Google Apps Script editor**, paste the code.

Now find this line (around line 8):
```javascript
const SHEET_ID = "YOUR_GOOGLE_SHEET_ID";
```

Replace `YOUR_GOOGLE_SHEET_ID` with the Sheet ID you saved in STEP 3.

**Example:**
```javascript
const SHEET_ID = "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t";
```

Click **Save** (Ctrl+S or Cmd+S)

---

## STEP 6: Deploy as Web App

In Google Apps Script:
- Click **Deploy** button (top right)
- Click **New deployment**
- A dropdown appears

**In the "Select type" dropdown on the left:**
- Click it
- Choose **Web app**

**Under "Execute as":**
- Choose your Google account (the one you're logged in with)

**Under "Who has access":**
- Choose **Anyone**

Click **Deploy** button (blue button at bottom)

---

## STEP 7: Authorize the Script

Google will show a warning:
- Click the **Google Account** button
- A popup asks for permission
- Click **Allow** (or "Continue")

---

## STEP 8: Copy Your Deployment URL

After deployment, you'll see this message:

```
New deployment created with version 1.
```

You'll see a section with:
- **Deployment ID**
- **URL:** (a long URL starting with https://script.google.com/...)

**Click the copy icon** next to the URL.

**Save this URL** - you'll need it in STEP 9.

---

## STEP 9: Update Your Shopping Cart Code

From your shopping cart folder, open:
```
index.html
```

Use Ctrl+F (Find) and search for:
```
GOOGLE_SHEETS_WEBHOOK_URL
```

You'll find this line (around line 3894):
```javascript
const GOOGLE_SHEETS_WEBHOOK_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEBHOOK_URL";
```

Replace the entire string in quotes with your deployment URL from STEP 8.

**Example:**
```javascript
const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/d/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7/userweb";
```

Click **Save** (Ctrl+S)

---

## STEP 10: Test It Works

Go back to Google Sheets (the one you created in STEP 2).

You should now see **two new sheets** at the bottom:
- **Orders** (with headers)
- **Swimmers** (with headers)

If you see these, **✅ YOU'RE DONE!**

---

## What Happens Now?

When a customer:
1. Adds products to cart
2. Fills out the form
3. Clicks "Complete Booking"

All their information is **automatically saved** to your Google Sheet:
- Order details (what they bought, price, discount)
- Contact info (name, phone, address, city, postal code)
- How they heard about LGSA

You can check the data anytime at your Google Sheet: https://sheets.google.com

---

## 🆘 If Something Goes Wrong

### "Sheets not created after deployment"
- Go back to Google Apps Script
- Click the **clock icon** (Executions)
- Look for errors in red

### "Data not saving when customer checks out"
- Open your browser console (F12)
- Check for error messages
- Make sure the WEBHOOK_URL in step 9 doesn't have extra spaces

### "Can't find Google Apps Script option"
- Make sure you're in Google Sheets first
- Click **Extensions** (not Insert or Format)
- Then **Apps Script**

---

## Summary Checklist

- [ ] Created Google Sheet "LGSA Shopping Cart Orders"
- [ ] Copied Sheet ID
- [ ] Opened Google Apps Script
- [ ] Pasted GoogleAppsScript.gs code
- [ ] Updated Sheet ID in line 8
- [ ] Clicked Save
- [ ] Deployed as Web app
- [ ] Authorized the script
- [ ] Copied deployment URL
- [ ] Updated GOOGLE_SHEETS_WEBHOOK_URL in index.html
- [ ] Verified "Orders" and "Swimmers" sheets created
- [ ] ✅ COMPLETE!

---

**You're all set! Your shopping cart now saves all customer data to Google Sheets automatically.**

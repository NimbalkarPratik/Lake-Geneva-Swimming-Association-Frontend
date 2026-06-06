/**
 * Google Apps Script for LGSA Shopping Cart
 * Saves order data and swimmer details to Google Sheets
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet at sheets.google.com
 * 2. Go to Extensions > Apps Script
 * 3. Paste this entire code into the editor
 * 4. Update the SHEET_ID variable below with your Google Sheet ID
 * 5. Click Deploy > New deployment > Type: Web app
 *    - Execute as: [Your Google Account]
 *    - Who has access: Anyone
 * 6. Copy the deployment URL and paste it into index.html at GOOGLE_SHEETS_WEBHOOK_URL
 */

// ========== CONFIGURATION ==========
// Replace with your actual Google Sheet ID (found in the URL: docs.google.com/spreadsheets/d/SHEET_ID/edit)
const SHEET_ID = "YOUR_GOOGLE_SHEET_ID";

// Create/get the Orders sheet and Swimmers sheet
function getOrdersSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName("Orders");
  if (!sheet) {
    sheet = ss.insertSheet("Orders");
    initOrdersSheet(sheet);
  }
  return sheet;
}

function getSwimmersSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName("Swimmers");
  if (!sheet) {
    sheet = ss.insertSheet("Swimmers");
    initSwimmersSheet(sheet);
  }
  return sheet;
}

// Initialize Orders sheet with headers
function initOrdersSheet(sheet) {
  sheet.getRange("A1:K1").setValues([[
    "Timestamp",
    "Order Reference",
    "Items (JSON)",
    "Subtotal (EUR)",
    "Discount Code",
    "Discount Amount (EUR)",
    "Fee (EUR)",
    "Total (EUR)",
    "Currency",
    "Payment Method",
    "Swimmer Name"
  ]]);
  sheet.getRange("A1:K1").setFontWeight("bold");
  sheet.getRange("A1:K1").setBackground("#0d2240");
  sheet.getRange("A1:K1").setFontColor("#ffffff");
  
  // Auto-resize columns
  for (let i = 1; i <= 11; i++) {
    sheet.autoResizeColumn(i);
  }
}

// Initialize Swimmers sheet with headers
function initSwimmersSheet(sheet) {
  sheet.getRange("A1:H1").setValues([[
    "Order Reference",
    "Swimmer Name",
    "Phone Country",
    "Phone",
    "Address",
    "City",
    "Province",
    "Postal Code",
    "Heard About Us"
  ]]);
  sheet.getRange("A1:I1").setFontWeight("bold");
  sheet.getRange("A1:I1").setBackground("#2db88a");
  sheet.getRange("A1:I1").setFontColor("#ffffff");
  
  // Auto-resize columns
  for (let i = 1; i <= 9; i++) {
    sheet.autoResizeColumn(i);
  }
}

// ========== WEBHOOK HANDLER ==========
function doPost(e) {
  try {
    // Parse the incoming JSON
    const payload = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!payload.order_reference || !payload.cart_items) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: "Missing order_reference or cart_items" })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Save to Orders sheet
    const ordersSheet = getOrdersSheet();
    ordersSheet.appendRow([
      payload.timestamp || new Date().toISOString(),
      payload.order_reference,
      JSON.stringify(payload.cart_items),
      payload.subtotal || 0,
      payload.discount || "None",
      payload.discount_amount || 0,
      payload.fee || 0,
      payload.total || 0,
      payload.currency || "EUR",
      payload.payment_method || "Unknown",
      payload.swimmer?.name || ""
    ]);
    
    // Save swimmer details to Swimmers sheet
    if (payload.swimmer) {
      const swimmer = payload.swimmer;
      const swimmersSheet = getSwimmersSheet();
      swimmersSheet.appendRow([
        payload.order_reference,
        swimmer.name || "",
        swimmer.phone_country || "",
        swimmer.phone || "",
        swimmer.address || "",
        swimmer.city || "",
        swimmer.province || "",
        swimmer.postal || "",
        swimmer.hear_about || ""
      ]);
    }
    
    // Log the event
    Logger.log("Order saved: " + payload.order_reference);
    
    // Return success
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Order saved successfully",
        order_reference: payload.order_reference
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log("Error in doPost: " + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (call from Apps Script console to verify setup)
function testWebhook() {
  const testPayload = {
    timestamp: new Date().toISOString(),
    order_reference: "LGSA-TEST-" + Math.floor(Math.random() * 1000000),
    cart_items: [
      { id: "event-1", name: "Test Event", qty: 1, unit_price: 25.00, total: 25.00 }
    ],
    subtotal: 25.00,
    discount: "None",
    discount_amount: 0,
    fee: 1.84,
    total: 26.84,
    currency: "EUR",
    payment_method: "Wise",
    swimmer: {
      name: "Test Swimmer",
      phone_country: "+1",
      phone: "555-123-4567",
      address: "123 Main St",
      city: "Test City",
      province: "Test Province",
      postal: "12345",
      hear_about: "Social Media"
    }
  };
  
  // Simulate doPost call
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testPayload)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log("Test result: " + result.getContent());
}

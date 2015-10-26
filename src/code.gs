//  1. Run > setup
//
//  2. Publish > Deploy as web app
//    - enter Project Version name and click 'Save New Version'
//    - set security level and enable service (most likely execute as 'me' and access 'anyone, even anonymously)
//
//  3. Copy the 'Current web app URL' and post this in your form/script action

var SCRIPT_PROP = PropertiesService.getScriptProperties();

function doGet(e) {
  return handleResponse(e);
}

function handleResponse(e) {
  var lock = LockService.getPublicLock();
  lock.waitLock(30000);

  try {
    var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
    var date = new Date().toJSON().substr(0, 10);
    var sheet = doc.getSheetByName(date);
    if (sheet == null) {
      sheet = doc.insertSheet(date);
      sheet.getRange(1, 1, 1, 2).setValues([["Product", "Amount"]]).setFontWeight("bold").setHorizontalAlignment("center");
      sheet.setColumnWidth(1, 360);
    }
    var existingProducts = sheet.getLastRow() > 1 ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues() : [];
    var newProducts = JSON.parse(e.parameters.products);

    // loop products
    for (i in newProducts) {
      var productExists = false;
      for (j in existingProducts) {
        if (existingProducts[j][0] == newProducts[i]) {
          existingProducts[j][1] = Number(existingProducts[j][1]) + 1;
          productExists = true;
          break;
        }
      }
      if (!productExists) {
        existingProducts.push([newProducts[i], 1]);
      }
    }

    // update sheet
    sheet.getRange(2, 1, existingProducts.length, 2).setValues(existingProducts);

    // return json success
    return ContentService
    .createTextOutput(JSON.stringify({"result": "success"}))
    .setMimeType(ContentService.MimeType.JSON);
  } catch(e) {
    // return json error
    return ContentService
    .createTextOutput(JSON.stringify({"result": "error", "error": e}))
    .setMimeType(ContentService.MimeType.JSON);
  } finally {
    // release lock
    lock.releaseLock();
  }
}

function setup() {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    SCRIPT_PROP.setProperty("key", doc.getId());
}

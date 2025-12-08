/**
 * Portal Visit Tracker - Google Apps Script Backend
 * 
 * Deployment Instructions:
 * 1. Open Google Sheet
 * 2. Extensions > Apps Script
 * 3. Paste this code
 * 4. Deploy > New deployment > Web app
 * 5. Execute as: Me
 * 6. Who has access: Anyone
 * 7. Copy deployment URL
 */

// Configuration
const SHEET_NAME_VISITS = 'PortalVisits';
const SHEET_NAME_SUMMARY = 'DailySummary';

/**
 * Initialize sheets if they don't exist
 */
function initializeSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Create PortalVisits sheet
  let visitsSheet = ss.getSheetByName(SHEET_NAME_VISITS);
  if (!visitsSheet) {
    visitsSheet = ss.insertSheet(SHEET_NAME_VISITS);
    visitsSheet.appendRow(['Timestamp', 'Portal', 'VisitorID', 'UserAgent', 'Referrer', 'SessionID']);
    visitsSheet.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#4285f4').setFontColor('white');
  }
  
  // Create DailySummary sheet
  let summarySheet = ss.getSheetByName(SHEET_NAME_SUMMARY);
  if (!summarySheet) {
    summarySheet = ss.insertSheet(SHEET_NAME_SUMMARY);
    summarySheet.appendRow(['Date', 'Portal', 'TotalVisits', 'UniqueVisitors']);
    summarySheet.getRange(1, 1, 1, 4).setFontWeight('bold').setBackground('#34a853').setFontColor('white');
  }
  
  return { visitsSheet, summarySheet };
}

/**
 * Handle POST requests - Record visit
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.portal || !data.timestamp || !data.visitorId) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Missing required fields'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Record the visit
    const result = recordVisit(data);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      count: result.totalCount,
      todayCount: result.todayCount
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests - Retrieve visit counts
 */
function doGet(e) {
  try {
    const portal = e.parameter.portal;
    
    if (!portal) {
      // Return all portal statistics
      const stats = getAllPortalStats();
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        data: stats
      })).setMimeType(ContentService.MimeType.JSON);
    } else {
      // Return specific portal statistics
      const stats = getPortalStats(portal);
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        data: stats
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    Logger.log('Error in doGet: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Record a visit to the sheet
 */
function recordVisit(data) {
  const sheets = initializeSheets();
  const visitsSheet = sheets.visitsSheet;
  
  // Append new visit row
  visitsSheet.appendRow([
    data.timestamp,
    data.portal,
    data.visitorId,
    data.userAgent || '',
    data.referrer || '',
    data.sessionId || ''
  ]);
  
  // Update summary
  updateDailySummary(data.portal);
  
  // Get counts for response
  const totalCount = getTotalVisits(data.portal);
  const todayCount = getTodayVisits(data.portal);
  
  return { totalCount, todayCount };
}

/**
 * Update daily summary sheet
 */
function updateDailySummary(portal) {
  const sheets = initializeSheets();
  const summarySheet = sheets.summarySheet;
  const visitsSheet = sheets.visitsSheet;
  
  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  
  // Count today's visits and unique visitors
  const data = visitsSheet.getDataRange().getValues();
  let todayVisits = 0;
  let uniqueVisitors = new Set();
  
  for (let i = 1; i < data.length; i++) {
    const rowDate = Utilities.formatDate(new Date(data[i][0]), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    const rowPortal = data[i][1];
    const visitorId = data[i][2];
    
    if (rowDate === today && rowPortal === portal) {
      todayVisits++;
      uniqueVisitors.add(visitorId);
    }
  }
  
  // Update or insert summary row
  const summaryData = summarySheet.getDataRange().getValues();
  let rowFound = false;
  
  for (let i = 1; i < summaryData.length; i++) {
    if (summaryData[i][0] === today && summaryData[i][1] === portal) {
      summarySheet.getRange(i + 1, 3).setValue(todayVisits);
      summarySheet.getRange(i + 1, 4).setValue(uniqueVisitors.size);
      rowFound = true;
      break;
    }
  }
  
  if (!rowFound) {
    summarySheet.appendRow([today, portal, todayVisits, uniqueVisitors.size]);
  }
}

/**
 * Get total visits for a portal
 */
function getTotalVisits(portal) {
  const sheets = initializeSheets();
  const visitsSheet = sheets.visitsSheet;
  const data = visitsSheet.getDataRange().getValues();
  
  let count = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i][1] === portal) {
      count++;
    }
  }
  
  return count;
}

/**
 * Get today's visits for a portal
 */
function getTodayVisits(portal) {
  const sheets = initializeSheets();
  const visitsSheet = sheets.visitsSheet;
  const data = visitsSheet.getDataRange().getValues();
  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  
  let count = 0;
  for (let i = 1; i < data.length; i++) {
    const rowDate = Utilities.formatDate(new Date(data[i][0]), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    if (rowDate === today && data[i][1] === portal) {
      count++;
    }
  }
  
  return count;
}

/**
 * Get statistics for a specific portal
 */
function getPortalStats(portal) {
  const totalVisits = getTotalVisits(portal);
  const todayVisits = getTodayVisits(portal);
  
  return {
    portal: portal,
    totalVisits: totalVisits,
    todayVisits: todayVisits,
    lastUpdated: new Date().toISOString()
  };
}

/**
 * Get statistics for all portals
 */
function getAllPortalStats() {
  const portals = [
    'mathematics-portal',
    'science-portal',
    'primarychinese-portal',
    'secondarychinese-portal',
    'biblestudy-portal'
  ];
  
  return portals.map(portal => getPortalStats(portal));
}

/**
 * Test function - Run this to initialize sheets manually
 */
function testInitialize() {
  initializeSheets();
  Logger.log('Sheets initialized successfully');
}

/**
 * Test function - Simulate a visit
 */
function testRecordVisit() {
  const testData = {
    timestamp: new Date().toISOString(),
    portal: 'mathematics-portal',
    visitorId: 'test-visitor-123',
    userAgent: 'Mozilla/5.0 (Test)',
    referrer: 'https://github.com',
    sessionId: 'session-abc'
  };
  
  const result = recordVisit(testData);
  Logger.log('Visit recorded: ' + JSON.stringify(result));
}

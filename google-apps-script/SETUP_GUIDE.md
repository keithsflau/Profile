# Google Sheets Visit Counter - Setup Guide

## 📋 Overview

This guide will help you set up the Google Sheets backend for the visit counter system.

**Your Google Sheet ID**: `1MCwfy6-dHekjByCmVbMsgIfTphSeJ32IGDCyZZOMiHM`

**Sheet URL**: https://docs.google.com/spreadsheets/d/1MCwfy6-dHekjByCmVbMsgIfTphSeJ32IGDCyZZOMiHM/edit

---

## ⚡ Quick Start (5 Steps)

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: **"Portal Visit Tracker"**
4. Copy the Sheet URL - you'll need the **Sheet ID** later

**Sheet ID Location**:
```
https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
                                        ^^^^^^^^^^^^^
```

### Step 2: Open Apps Script Editor

1. In your Google Sheet, click: **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy the code from [`Code.gs`](file:///c:/Users/keith/OneDrive/Desktop/Profile/google-apps-script/Code.gs)
4. Paste it into the Apps Script editor
5. Click **Save** (disk icon) or `Ctrl+S`
6. Name the project: **"Portal Visit API"**

### Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure settings:
   - **Description**: "Portal Visit Counter API"
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone**
5. Click **Deploy**
6. **Authorize** the app when prompted:
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to Portal Visit API (unsafe)"
   - Click "Allow"
7. **Copy the Web App URL** - This is your `SCRIPT_URL`!

**Your Script URL will look like:**
```
https://script.google.com/macros/s/AKfycbyXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec
```

### Step 4: Test the Deployment

1. In Apps Script editor, select function dropdown
2. Choose **testInitialize**
3. Click **Run** (▶️ play button)
4. Check your Google Sheet - should see 2 new sheets:
   - ✅ `PortalVisits`  
   - ✅ `DailySummary`

5. Select **testRecordVisit** function
6. Click **Run**  
7. Check `PortalVisits` sheet - should see a test row!

### Step 5: Update Portal Pages

Replace `YOUR_SCRIPT_URL_HERE` with your actual Script URL in each portal page:

**Example for Mathematics Portal:**

```html
<!-- Before closing </body> tag -->
<script src="../visit-counter.js"></script>
<script>
  VisitCounter.init('mathematics-portal', {
    scriptUrl: 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec',
    containerId: 'visit-counter-counter'
  });
</script>
```

**Files to update:**
- [`Mathematics/index.html`](file:///c:/Users/keith/OneDrive/Desktop/Profile/Mathematics/index.html)
- [`Science/index.html`](file:///c:/Users/keith/OneDrive/Desktop/Profile/Science/index.html)
- [`PrimaryChinese/index.html`](file:///c:/Users/keith/OneDrive/Desktop/Profile/PrimaryChinese/index.html)
- [`SeconardyChinese/index.html`](file:///c:/Users/keith/OneDrive/Desktop/Profile/SeconardyChinese/index.html)
- [`bible_study/index.html`](file:///c:/Users/keith/OneDrive/Desktop/Profile/bible_study/index.html)

---

## 📊 Adding Charts

### Option 1: Embedded Google Chart (Recommended)

1. In Google Sheet, create a **Pivot Table**:
   - Data → Pivot table
   - Data range: `DailySummary!A:D`
   - Rows: Date, Portal
   - Values: TotalVisits (SUM)

2. Insert Chart:
   - Select pivot table
   - Insert → Chart
   - Chart type: Line chart or Column chart
   - Customize as needed

3. Publish Chart:
   - Click chart → Three dots menu → Publish chart
   - Format: Interactive
   - Click **Publish**
   - Copy embed code

4. Add to Portal Page:
```html
<div class="mt-8">
  <h3 class="text-xl font-semibold mb-4">訪問統計</h3>
  <iframe 
    width="100%" 
    height="400" 
    seamless 
    frameborder="0" 
    scrolling="no" 
    src="https://docs.google.com/spreadsheets/d/SHEET_ID/pubchart?oid=CHART_ID&format=interactive">
  </iframe>
</div>
```

### Option 2: Custom Chart with Chart.js

Add Chart.js library and fetch data from your Apps Script:

```html
<canvas id="visitChart"></canvas>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
  fetch('YOUR_SCRIPT_URL?portal=mathematics-portal')
    .then(r => r.json())
    .then(data => {
      // Create chart with data.totalVisits, data.todayVisits
    });
</script>
```

---

## 🔧 Troubleshooting

### Issue: "Authorization required"
- **Solution**: Redeploy the web app and complete authorization flow

### Issue: Counter shows "offline"
- **Solution**: Check Script URL is correct and accessible
- **Test**: Open Script URL in browser - should return JSON

### Issue: Data not saving to sheet
- **Solution**: 
  - Run `testRecordVisit()` in Apps Script
  - Check Execution log for errors
  - Verify sheet names match exactly

### Issue: CORS errors
- **Solution**: Make sure Web App "Who has access" is set to **Anyone**

### Issue: Too many requests
- **Solution**: Apps Script has daily quotas (~20,000 calls/day)
- Session-based tracking already limits calls

---

## 📝 Sheet Structure Reference

### PortalVisits Sheet
| Column | Description | Example |
|--------|-------------|---------|
| Timestamp | ISO timestamp of visit | 2025-12-09T00:30:00Z |
| Portal | Portal identifier | mathematics-portal |
| VisitorID | Anonymous visitor hash | abc123def |
| UserAgent | Browser info | Mozilla/5.0... |
| Referrer | Where visitor came from | https://google.com |
| SessionID | Unique session ID | xyz789 |

### DailySummary Sheet
| Column | Description | Example |
|--------|-------------|---------|
| Date | Date (YYYY-MM-DD) | 2025-12-09 |
| Portal | Portal identifier | mathematics-portal |
| TotalVisits | Total visits that day | 45 |
| UniqueVisitors | Unique visitors that day | 32 |

---

## 🎯 Next Steps

1. ✅ Create Google Sheet
2. ✅ Deploy Apps Script
3. ✅ Test with test functions
4. ⏳ Update portal pages with Script URL
5. ⏳ Push to GitHub
6. ⏳ Test on GitHub Pages
7. ⏳ Add charts (optional)

---

## 💡 Pro Tips

1. **Monitor Usage**: Apps Script → Executions to see all requests
2. **View Logs**: Apps Script → View logs to debug issues
3. **Backup Data**: File → Download → CSV (periodically)
4. **Analytics**: Use Pivot Tables in Sheets for custom reports
5. **Privacy**: No PII is collected - only anonymous hashes

---

## 🔗 Important Links

- [Your Google Sheet](file:///c:/Users/keith/OneDrive/Desktop/Profile/google-apps-script/Code.gs) ← Open this to start
- [Apps Script Documentation](https://developers.google.com/apps-script)
- [Google Charts Gallery](https://developers.google.com/chart/interactive/docs/gallery)

---

**Need Help?**
- Check Apps Script execution logs
- Verify Script URL is accessible
- Test with provided test functions
- Ensure authorization is complete

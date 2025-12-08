# Visit Counter for All Pages - Usage Guide

## 🚀 Quick Start

### Step 1: Deploy Google Apps Script

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1MCwfy6-dHekjByCmVbMsgIfTphSeJ32IGDCyZZOMiHM/edit
2. Extensions → Apps Script
3. Paste code from `google-apps-script/Code.gs`
4. Deploy → New deployment → Web app
5. Copy your deployment URL

### Step 2: Run Batch Script

**Option A: Test First (Dry Run)**
```powershell
cd "c:\Users\keith\OneDrive\Desktop\Profile"
.\add-visit-counters.ps1 -ScriptUrl "YOUR_SCRIPT_URL" -DryRun
```

**Option B: Apply Changes**
```powershell
.\add-visit-counters.ps1 -ScriptUrl "https://script.google.com/macros/s/YOUR_ID/exec"
```

### Step 3: Verify

Open any page and check:
- Visit counter badge appears
- Google Sheet receives data
- Page ID is correct

---

## 📝 How It Works

### Page ID Generation

Each page gets a unique ID based on its file path:

| File Path | Generated Page ID |
|-----------|-------------------|
| `index.html` | `main-portal` |
| `Mathematics/index.html` | `mathematics` |
| `Science/Junior Science/Cell/index.html` | `science/junior-science/cell` |
| `PrimaryChinese/idiom_mood_board/index.html` | `primarychinese/idiom-mood-board` |

### What the Script Does

1. ✅ Scans all HTML files (excludes node_modules, dist, .git)
2. ✅ Generates unique page ID from file path
3. ✅ Adds `<div id="visit-counter-container">` before `</main>` or `</body>`
4. ✅ Adds visit counter script before `</body>`
5. ✅ Skips files that already have visit counter
6. ✅ Reports statistics

### Added Code Example

```html
    <!-- Visit Counter -->
    <div id="visit-counter-container" class="text-center my-4"></div>

    <!-- Visit Counter Script -->
    <script src="/visit-counter.js"></script>
    <script>
        const SCRIPT_URL = 'YOUR_SCRIPT_URL';
        VisitCounter.init('mathematics/f2-continuous-data', {
            scriptUrl: SCRIPT_URL,
            containerId: 'visit-counter-container'
        });
    </script>
</body>
```

---

## ⚙️ Script Options

### Dry Run (Test Mode)
```powershell
.\add-visit-counters.ps1 -ScriptUrl "URL" -DryRun
```
Shows what would be changed without modifying files.

### Normal Run
```powershell
.\add-visit-counters.ps1 -ScriptUrl "https://script.google.com/macros/s/XXX/exec"
```
Applies changes to all files.

---

## 📊 Expected Results

For ~89 HTML files, you should see:

```
=== Summary ===
Total files scanned: 89
Successfully added: 84
Already has counter: 5  (portal pages already have counters)
Skipped: 0
Errors: 0
```

---

## 🔧 Troubleshooting

### Issue: Permission Denied
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Issue: Script URL Not Set
Make sure you replace `YOUR_SCRIPT_URL` with actual URL from Apps Script deployment.

### Issue: Files Not Found
Check you're in the correct directory:
```powershell
cd "c:\Users\keith\OneDrive\Desktop\Profile"
```

### Issue: Want to Remove Counters
Manual removal required or create separate cleanup script.

---

## 📁 Files Modified

The script will modify:
- All `*.html` files in Profile directory
- Automatically skips:
  - Files in `node_modules/`
  - Files in `dist/`
  - Files in `.git/`
  - Files that already have visit counter

---

## 🎯 After Running Script

### 1. Commit Changes
```bash
git add .
git commit -m "feat: Add visit counters to all pages"
git push
```

### 2. View Analytics

Open your Google Sheet to see:
- **PortalVisits** sheet → All individual visits
- **DailySummary** sheet → Daily aggregated data

### 3. Create Dashboard (Optional)

In Google Sheet:
1. Insert → Pivot table from DailySummary
2. Rows: Portal
3. Values: Sum of TotalVisits
4. Insert → Chart → Bar chart

---

## 💡 Pro Tips

1. **Always run with -DryRun first** to preview changes
2. **Backup before running** (or use git to revert if needed)
3. **Check a few pages manually** after running to verify
4. **Monitor Google Sheet** to see data coming in
5. **Use Sheet filters** to analyze specific portals

---

## 📈 Analytics Examples

### Most Visited Pages
```
=QUERY(PortalVisits!A:F, "SELECT B, COUNT(B) GROUP BY B ORDER BY COUNT(B) DESC LIMIT 10")
```

### Today's Traffic
```
=QUERY(PortalVisits!A:F, "SELECT B, COUNT(B) WHERE A >= date '"&TEXT(TODAY(),"yyyy-mm-dd")&"' GROUP BY B ORDER BY COUNT(B) DESC")
```

### Unique Visitors per Portal
```
=QUERY(PortalVisits!A:F, "SELECT B, COUNT(DISTINCT C) GROUP BY B ORDER BY COUNT(DISTINCT C) DESC")
```

---

## ✅ Next Steps

1. [ ] Deploy Google Apps Script
2. [ ] Get deployment URL
3. [ ] Run script with -DryRun
4. [ ] Review dry run output
5. [ ] Run script to apply changes
6. [ ] Push to GitHub
7. [ ] Test on GitHub Pages
8. [ ] Check Google Sheet data
9. [ ] (Optional) Create analytics dashboard

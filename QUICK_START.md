# Quick Start - Add Visit Counters to All Pages

## 🎯 Goal
Add visit counters to all 194 HTML pages automatically.

## ⚡ 3 Simple Steps

### Step 1: Deploy Google Apps Script (One-time Setup)

1. **Open your Sheet**: https://docs.google.com/spreadsheets/d/1MCwfy6-dHekjByCmVbMsgIfTphSeJ32IGDCyZZOMiHM/edit

2. **Open Apps Script**:
   - Click: Extensions → Apps Script

3. **Paste Code**:
   - Delete existing code
   - Copy from: [`google-apps-script/Code.gs`](file:///c:/Users/keith/OneDrive/Desktop/Profile/google-apps-script/Code.gs)
   - Paste into editor
   - Save (Ctrl+S)

4. **Deploy**:
   - Deploy → New deployment
   - Select type: Web app
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click Deploy
   - Authorize when prompted
   - **COPY THE URL** (looks like: `https://script.google.com/macros/s/...../exec`)

5. **Test**:
   ```
   In Apps Script, run: testInitialize
   Check your Sheet - should see 2 new tabs: PortalVisits, DailySummary
   ```

---

### Step 2: Run Batch Script

Open PowerShell and run:

```powershell
cd "c:\Users\keith\OneDrive\Desktop\Profile"

# Test first (safe, no changes)
.\add-visit-counters.ps1 -ScriptUrl "PASTE_YOUR_SCRIPT_URL_HERE" -DryRun

# If dry run looks good, apply changes
.\add-visit-counters.ps1 -ScriptUrl "PASTE_YOUR_SCRIPT_URL_HERE"
```

**Expected output:**
```
=== Summary ===
Total files scanned: 194
Successfully added: ~189
Already has counter: ~5
Skipped: 0
Errors: 0
```

---

### Step 3: Push to GitHub & Test

```bash
git add .
git commit -m "feat: Add visit counters to all 194 pages"
git push
```

Then visit any page on GitHub Pages - counter should appear!

---

## 📊 What Gets Added

To each HTML page:

```html
    <!-- Visit Counter -->
    <div id="visit-counter-container" class="text-center my-4"></div>

    <!-- Visit Counter Script -->
    <script src="/visit-counter.js"></script>
    <script>
        const SCRIPT_URL = 'YOUR_SCRIPT_URL';
        VisitCounter.init('unique-page-id', {
            scriptUrl: SCRIPT_URL,
            containerId: 'visit-counter-container'
        });
    </script>
</body>
```

---

## 🔍 Page ID Examples

| File | Unique Page ID |
|------|----------------|
| `index.html` | `main-portal` |
| `Mathematics/index.html` | `mathematics` |
| `Mathematics/F2 Continuous Data/index.html` | `mathematics/f2-continuous-data` |
| `PrimaryChinese/idiom_mood_board/index.html` | `primarychinese/idiom-mood-board` |
| `Science/Junior Science/Cell/index.html` | `science/junior-science/cell` |

---

## ✅ Checklist

- [ ] Open Google Sheet
- [ ] Extensions → Apps Script
- [ ] Paste Code.gs
- [ ] Deploy as Web app
- [ ] Authorize
- [ ] Copy Script URL
- [ ] Run test: `testInitialize`
- [ ] Run batch script with `-DryRun`
- [ ] Review dry run output
- [ ] Run batch script without `-DryRun`
- [ ] Check a few pages manually
- [ ] Git commit and push
- [ ] Test on GitHub Pages
- [ ] Check Google Sheet for data

---

## 🎉 Done!

All 194 pages will have visit counters tracking to your Google Sheet!

**View full guides:**
- [Setup Guide](file:///c:/Users/keith/OneDrive/Desktop/Profile/google-apps-script/SETUP_GUIDE.md) - Detailed Apps Script setup
- [Batch Install Guide](file:///c:/Users/keith/OneDrive/Desktop/Profile/BATCH_INSTALL_GUIDE.md) - Script options and troubleshooting

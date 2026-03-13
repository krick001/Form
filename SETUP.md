# Detailed Setup Guide

## Prerequisites

- A Google account (for Google Sheets and Apps Script)
- Web browser (Chrome, Firefox, Safari, or Edge)
- Text editor (VS Code recommended)

## Option 1: Demo Mode (No Google Account Required)

The form works immediately in demo mode without any Google configuration:

1. Navigate to `Form/Form.html` in your browser
2. Fill out the form
3. Click "Soumettre le Rapport"
4. Data is stored in your browser's localStorage

**Pros**: No setup required, works instantly
**Cons**: Data is stored locally, not shared across devices

---

## Option 2: Full Google Sheets Integration

### Step 1: Create Google Spreadsheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click **+ New** to create a new spreadsheet
3. Rename it to "Morocco88 Monthly Reports"

### Step 2: Create Configuration Sheets

Create the following sheets in your spreadsheet:

#### Sheet 1: Configuration_Graduates
- Rename Sheet1 to "Configuration_Graduates"
- Column A header: "Graduate"
- Add values:
  - Morocco88
  - Tunisia88
  - Egypt88
  - Jordan88
  - Lebanon88

#### Sheet 2: Configuration_Regions
- Click **+** to add new sheet
- Rename to "Configuration_Regions"
- Column A header: "Region"
- Add values:
  - Rabat-Salé-Kénitra
  - Fès-Meknès
  - Marrakech-Safi
  - Tanger-Tetouan-AlHouceima
  - Casablanca-Settat
  - Oriental

#### Sheet 3: Configuration_Schools
- Click **+** to add new sheet
- Rename to "Configuration_Schools"
- Column headers (Row 1):
  - A: School Name
  - B: Graduate
  - C: Region
- Add school data (sample provided in README.md)

#### Sheet 4: MonthlyReports
- The script will create this automatically on first submission

### Step 3: Get Spreadsheet ID

1. In your Google Sheets URL:
   ```
   https://docs.google.com/spreadsheets/d/1ABC123XYZ456DEF789GHI012JKL345M/edit
   ```
2. Copy the ID between `/d/` and `/edit`:
   ```
   1ABC123XYZ456DEF789GHI012JKL345M
   ```

### Step 4: Set Up Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Click **+ New Project**
3. Rename project to "Morocco88 Report Backend"
4. Open `Code.gs` from this project
5. Copy all the code
6. Paste into Apps Script editor
7. Find this line:
   ```javascript
   const CONFIG = {
       SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID_HERE',
   ```
8. Replace with your spreadsheet ID:
   ```javascript
   const CONFIG = {
       SPREADSHEET_ID: '1ABC123XYZ456DEF789GHI012JKL345M',
   ```

### Step 5: Deploy Apps Script

1. Click **Deploy** > **New deployment**
2. Click the gear icon > **Web app**
3. Configure:
   - Description: "Morocco88 Monthly Report Form"
   - Execute as: Me
   - Who has access: Anyone
4. Click **Deploy**
5. Copy the **Web app URL**

### Step 6: Connect Form to Apps Script

1. Open `Form/Form.html` in your text editor
2. Find line ~45:
   ```javascript
   const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace with your Web App URL:
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/ABC123XYZ456.../exec';
   ```

### Step 7: Test the Form

1. Open `Form/Form.html` in your browser
2. Fill in all required fields
3. Submit the form
4. Check your Google Sheet - data should appear in MonthlyReports

---

## Testing Checklist

- [ ] Form loads correctly
- [ ] All dropdowns populate with data
- [ ] School filter works (select Graduate + Region)
- [ ] Celebration fields appear when number > 0
- [ ] Form validates required fields
- [ ] Success message shows after submission
- [ ] Data appears in Google Sheets
- [ ] Duplicate submission is blocked (same name, same month)
- [ ] Works on mobile (responsive design)

---

## Common Issues

### "No schools appear after selecting Graduate and Region"

**Cause**: No schools match the selected combination in the data

**Solution**: Add schools to the Configuration_Schools sheet or update schoolsData in Form.html

### "Form doesn't submit / nothing happens"

**Cause**: JavaScript error or network issue

**Solution**: 
1. Open browser Developer Tools (F12)
2. Check Console for errors
3. Verify SCRIPT_URL is correct

### "Data doesn't appear in Google Sheets"

**Cause**: Permissions or sheet name mismatch

**Solution**:
1. Check Apps Script execution logs
2. Verify sheet names match exactly
3. Ensure spreadsheet is shared with the Apps Script

---

## Security Notes

- The form does NOT require authentication (intentional for easy leader access)
- Duplicate checking relies on name matching
- For production use, consider adding a password field or leader ID

---

## Need Help?

If you encounter issues not covered here:
1. Check browser console (F12 > Console)
2. Check Apps Script logs (Apps Script > Executions)
3. Verify all configuration steps


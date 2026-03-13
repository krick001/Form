# Morocco88 Monthly Report Form System

A professional monthly report form system for club leaders connected to Google Sheets.

## Features

- **Monthly Submission Rule**: Each leader can submit only once per month
- **Smart Filtering**: Schools filtered dynamically by Graduate and Region
- **Dynamic Fields**: Participant fields auto-generated based on celebration count
- **Google Sheets Integration**: All data stored in Google Sheets
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Input Validation**: Required field validation
- **Success/Error Messages**: User-friendly feedback

## Project Structure

```
Form/
├── Form.html          # Main HTML form with Tailwind CSS
├── Code.gs            # Google Apps Script backend
├── README.md          # This file
└── SETUP.md          # Setup instructions
```

## Quick Start (Demo Mode)

The form works immediately in demo mode without any configuration:

1. Open `Form/Form.html` in a web browser
2. Fill in the form fields
3. Submit - data is stored in localStorage

**Note**: In demo mode, duplicate submission is checked via localStorage.

## Google Sheets Setup

### Step 1: Create Google Sheets

Create a new Google Spreadsheet with the following sheets:

1. **Configuration_Graduates** - Column A: Graduate Names
2. **Configuration_Regions** - Column A: Region Names  
3. **Configuration_Schools** - Columns: School Name | Graduate | Region
4. **MonthlyReports** - Will be auto-created on first submission

### Sheet Structure

#### Configuration_Graduates (Column A)
```
Graduate
Morocco88
Tunisia88
Egypt88
Jordan88
Lebanon88
```

#### Configuration_Regions (Column A)
```
Region
Rabat-Salé-Kénitra
Fès-Meknès
Marrakech-Safi
Tanger-Tetouan-AlHouceima
Casablanca-Settat
Oriental
```

#### Configuration_Schools (Columns A, B, C)
```
School Name | Graduate | Region
Lycée Qualifiant Hassan II | Morocco88 | Rabat-Salé-Kénitra
Lycée Qualifiant Mohamed V | Morocco88 | Rabat-Salé-Kénitra
... (add all schools)
```

#### MonthlyReports (Auto-created)
Headers will be:
- Nom Complet
- Rôle
- Graduate
- Région
- École
- Nombre de Sessions
- Nombre de Célébrations
- Notes
- Mois
- Année
- Timestamp
- Participants Célébration 1-10

### Step 2: Deploy Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Create a new project
3. Copy the contents of `Code.gs` into the editor
4. Update `CONFIG.SPREADSHEET_ID` with your Google Sheets ID
5. Deploy as Web App:
   - Execute as: Me
   - Who has access: Anyone
6. Copy the Web App URL

### Step 3: Connect Form to Google Apps Script

1. Open `Form/Form.html`
2. Find the line:
   ```javascript
   const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace with your deployed Web App URL

## Form Fields

### Section 1: Leader Information
- **Full Name** (text, required)
- **Role** (dropdown: Leader / Vice Leader)

### Section 2: Club Information
- **Graduate** (dropdown, required)
- **Region** (dropdown, required)
- **School Name** (dropdown, required - filtered by Graduate + Region)

### Section 3: Activity Statistics
- **Number of Sessions** (number, required)
- **Number of Celebrations** (number 0-10, required)
- **Dynamic Participant Fields** (auto-generated based on celebrations)

### Section 4: Additional Information
- **Notes** (textarea, optional)

## Logic

### Duplicate Submission Prevention
- System checks Full Name + Month + Year combination
- If duplicate found, submission is blocked
- New submission allowed only in new month

### Smart Filtering
- School dropdown is disabled until Graduate AND Region are selected
- Schools filtered: `schoolsData.filter(s => s.graduate === graduate && s.region === region)`

### Dynamic Fields
- When celebrations > 0, participant input fields are generated
- Number of fields = celebration count

## Customization

### Adding More Schools
Add to the `schoolsData` array in `Form.html`:
```javascript
{ name: 'New School Name', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' }
```

### Changing Styles
Tailwind CSS classes can be modified directly in the HTML. The form uses:
- Primary color: `#C1121F` (Morocco Red)
- Dark variant: `#8B0000`

### Adding New Fields
1. Add input field in HTML
2. Add to formData object in JavaScript
3. Add to headers in Google Apps Script (for Sheets storage)

## Troubleshooting

### Form not loading
- Check browser console for errors
- Verify all CDN links are accessible

### Duplicate check not working
- In demo mode: Clear localStorage
- In production: Check Google Sheets permissions

### Data not saving to Google Sheets
- Verify Spreadsheet ID is correct
- Check Apps Script deployment permissions
- Ensure sheet names match exactly

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for Morocco88 - Programme Musical Périscolaire au Maroc.

---

For support, please contact the development team.


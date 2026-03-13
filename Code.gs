/**
 * Morocco88 Monthly Report Form - Google Apps Script Backend
 * 
 * This script handles:
 * - Serving the HTML form
 * - Checking for duplicate submissions
 * - Saving form data to Google Sheets
 * - Providing configuration data for dropdowns
 */

// ============================================
// CONFIGURATION - Update these values
// ============================================
const CONFIG = {
    SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID_HERE', // Replace with your Google Sheets ID
    SHEET_NAMES: {
        CONFIG_GRADUATES: 'Configuration_Graduates',
        CONFIG_REGIONS: 'Configuration_Regions',
        CONFIG_SCHOOLS: 'Configuration_Schools',
        REPORTS: 'MonthlyReports'
    }
};

// ============================================
// MAIN FUNCTIONS
// ============================================

/**
 * Called when the web app is accessed
 * Serves the HTML form
 */
function doGet() {
    return HtmlService.createTemplateFromFile('Form')
        .evaluate()
        .setTitle('Rapport Mensuel | Morocco88')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Include HTML content from another file
 */
function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Handle POST requests for form submission
 */
function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);
        
        if (data.action === 'submit') {
            return submitReport(data);
        } else if (data.action === 'checkDuplicate') {
            return checkDuplicateSubmission(data.name, data.month, data.year);
        } else if (data.action === 'getConfig') {
            return getConfigData();
        }
        
        return { success: false, message: 'Unknown action' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// ============================================
// CONFIGURATION DATA FUNCTIONS
// ============================================

/**
 * Get all configuration data for the form dropdowns
 */
function getConfigData() {
    try {
        const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
        
        const graduates = getSheetData(spreadsheet, CONFIG.SHEET_NAMES.CONFIG_GRADUATES);
        const regions = getSheetData(spreadsheet, CONFIG.SHEET_NAMES.CONFIG_REGIONS);
        const schools = getSheetData(spreadsheet, CONFIG.SHEET_NAMES.CONFIG_SCHOOLS);
        
        return {
            success: true,
            data: {
                graduates: graduates.map(g => g[0]).filter(g => g),
                regions: regions.map(r => r[0]).filter(r => r),
                schools: schools.map(s => ({
                    name: s[0],
                    graduate: s[1],
                    region: s[2]
                })).filter(s => s.name)
            }
        };
    } catch (error) {
        // Return fallback data if Google Sheets is not configured
        return {
            success: false,
            fallback: true,
            data: getFallbackData()
        };
    }
}

/**
 * Get data from a sheet
 */
function getSheetData(spreadsheet, sheetName) {
    try {
        const sheet = spreadsheet.getSheetByName(sheetName);
        if (!sheet) return [];
        
        const lastRow = sheet.getLastRow();
        if (lastRow <= 1) return [];
        
        return sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
    } catch (error) {
        return [];
    }
}

/**
 * Fallback data when Google Sheets is not configured
 */
function getFallbackData() {
    return {
        graduates: [
            'Morocco88',
            'Tunisia88',
            'Egypt88',
            'Jordan88',
            'Le Lebanon88'
        ],
        regions: [
            'Rabat-Salé-Kénitra',
            'Fès-Meknès',
            'Marrakech-Safi',
            'Tanger-Tetouan-AlHouceima',
            'Casablanca-Settat',
            'Oriental'
        ],
        schools: [
            { name: 'Lycée Qualifiant Hassan II', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Lycée Qualifiant Mohamed V', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Lycée Qualifiant Lalla Aicha', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Collège Lalla Kenza', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Lycée Qualifiant Moulay Youssef', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Lycée Qualifiant Lalla Nazha', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Lycèe Ibnou Battouta', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Lycèe Ibnou Rochd (Rabat)', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Lycèe Charif Idrissi (Rabat)', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Lycèe Moulay Abdellah', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Lycèe Ibrahim Roudani (Rabat)', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Lycèe Abdellah Guennoun', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Lycèe Ibrahim Al Mawsili', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Lycèe Al Moutanabbi', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Lycèe Salama Masadeq', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Lycèe Abderrahman Nasser', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Lycèe Chraibi', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Lycèe Taha Hussein (Kenitra)', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Lycèe Ibnou Rochd (Temara)', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Lycèe Al Imam Boukhari', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Lycèe Al Imam Ghazali', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Collège Moulay Ismail', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Lycèe Moulay Ibn Noussair', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Collège Al Jahidh', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Lycèe Al Jahidh', graduate: 'Morocco88', region: 'Rabat-Salé-Kénitra' },
            { name: 'Lycée Qualifiant Moulay Idriss', graduate: 'Morocco88', region: 'Fès-Meknès' },
            { name: 'Lycée Qualifiant Oum Elbanine', graduate: 'Morocco88', region: 'Fès-Meknès' },
            { name: 'Lycée Qualifiant Ibn Hazm', graduate: 'Morocco88', region: 'Fès-Meknès' },
            { name: 'Collège Touria Sakaat', graduate: 'Morocco88', region: 'Fès-Meknès' },
            { name: 'Lycèe Moulay Hassan', graduate: 'Morocco88', region: 'Fès-Meknès' },
            { name: 'Lycèe Moulay Slimane', graduate: 'Morocco88', region: 'Fès-Meknès' },
            { name: 'Lycèe Al Adarissa', graduate: 'Morocco88', region: 'Fès-Meknès' },
            { name: 'Lycèe Khawarizmi', graduate: 'Morocco88', region: 'Fès-Meknès' },
            { name: 'Collégé Zohour', graduate: 'Morocco88', region: 'Fès-Meknès' },
            { name: 'Lycèe Abdelkarim Raiss', graduate: 'Morocco88', region: 'Fès-Meknès' },
            { name: 'Lycèe Michlifen', graduate: 'Morocco88', region: 'Fès-Meknès' },
            { name: 'Lycèe Mohammed V (Azrou)', graduate: 'Morocco88', region: 'Fès-Meknès' },
            { name: 'Collège Al Wahda', graduate: 'Morocco88', region: 'Fès-Meknès' },
            { name: 'Lycèe Marjiia', graduate: 'Morocco88', region: 'Fès-Meknès' },
            { name: 'Lycèe Lalla Amina', graduate: 'Morocco88', region: 'Fès-Meknès' },
            { name: 'Collège Ibn Tofail (Meknes)', graduate: 'Morocco88', region: 'Fès-Meknès' },
            { name: 'Lycèe Al Bassatine', graduate: 'Morocco88', region: 'Fès-Meknès' },
            { name: 'Collège Ahmed Chawki', graduate: 'Morocco88', region: 'Fès-Meknès' },
            { name: 'Lycèe 18 Novembre', graduate: 'Morocco88', region: 'Fès-Meknès' },
            { name: 'Collégé Acharaf', graduate: 'Morocco88', region: 'Marrakech-Safi' },
            { name: 'Lycée Qualifiant Acharaf', graduate: 'Morocco88', region: 'Marrakech-Safi' },
            { name: 'Lycée Qualifiant Mohamed V', graduate: 'Morocco88', region: 'Marrakech-Safi' },
            { name: 'Lycée Qualifiant Mohamed VI', graduate: 'Morocco88', region: 'Marrakech-Safi' },
            { name: 'Collège Idriss 2', graduate: 'Morocco88', region: 'Marrakech-Safi' },
            { name: 'Lycèe Charif Idrissi (Safi)', graduate: 'Morocco88', region: 'Marrakech-Safi' },
            { name: 'Lycèe Al Hidaya Al Islamyya', graduate: 'Morocco88', region: 'Marrakech-Safi' },
            { name: 'Lycèe Youssof Ibnou Tachafine', graduate: 'Morocco88', region: 'Marrakech-Safi' },
            { name: 'Lycèe Fatima Mernissi', graduate: 'Morocco88', region: 'Marrakech-Safi' },
            { name: 'Lycèe Zarktouni', graduate: 'Morocco88', region: 'Marrakech-Safi' },
            { name: 'Lycèe Abou Abbas Sabti', graduate: 'Morocco88', region: 'Marrakech-Safi' },
            { name: 'Lycèe Sahnoune', graduate: 'Morocco88', region: 'Marrakech-Safi' },
            { name: 'Lycèe Zineb Nafzawya', graduate: 'Morocco88', region: 'Marrakech-Safi' },
            { name: 'Collège Taha Houssein', graduate: 'Morocco88', region: 'Marrakech-Safi' },
            { name: 'Collège Fadwa Toukane', graduate: 'Morocco88', region: 'Marrakech-Safi' },
            { name: 'Collège Mohammed V', graduate: 'Morocco88', region: 'Marrakech-Safi' },
            { name: 'Lycèe Rhamna', graduate: 'Morocco88', region: 'Marrakech-Safi' },
            { name: 'Collège El Farabi', graduate: 'Morocco88', region: 'Marrakech-Safi' },
            { name: 'Lycèe Chahid Saleh Sarghini', graduate: 'Morocco88', region: 'Marrakech-Safi' },
            { name: 'Lycèe Ibn Al Khatib', graduate: 'Morocco88', region: 'Tanger-Tetouan-AlHouceima' },
            { name: 'Collège Mohammed VI (Tanger)', graduate: 'Morocco88', region: 'Tanger-Tetouan-AlHouceima' },
            { name: 'Lycèe Zineb Annafzawya (Tanger)', graduate: 'Morocco88', region: 'Tanger-Tetouan-AlHouceima' },
            { name: 'Lycèe Moulay Rachid', graduate: 'Morocco88', region: 'Tanger-Tetouan-AlHouceima' },
            { name: 'Collège Mohammed V (Tanger)', graduate: 'Morocco88', region: 'Tanger-Tetouan-AlHouceima' },
            { name: 'Collège Ibn Hicham', graduate: 'Morocco88', region: 'Casablanca-Settat' },
            { name: 'Lycèe Badr', graduate: 'Morocco88', region: 'Casablanca-Settat' },
            { name: 'Lycèe Ibn Battouta (Casa)', graduate: 'Morocco88', region: 'Casablanca-Settat' },
            { name: 'Lycèe Ibn Bannae Mourrakouchi', graduate: 'Morocco88', region: 'Casablanca-Settat' },
            { name: 'Lycèe Nador', graduate: 'Morocco88', region: 'Oriental' },
            { name: 'Lycèe Abdelkarim Khattabi', graduate: 'Morocco88', region: 'Oriental' },
            { name: 'Lycèe Mohammed 5 (Nador)', graduate: 'Morocco88', region: 'Oriental' },
            { name: 'Lycèe Taha Hussein (Nador)', graduate: 'Morocco88', region: 'Oriental' }
        ]
    };
}

// ============================================
// DUPLICATE CHECK FUNCTION
// ============================================

/**
 * Check if a leader has already submitted a report this month
 */
function checkDuplicateSubmission(name, month, year) {
    try {
        const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
        const sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAMES.REPORTS);
        
        if (!sheet) {
            return { success: false, duplicate: false };
        }
        
        const lastRow = sheet.getLastRow();
        if (lastRow <= 1) {
            return { success: true, duplicate: false };
        }
        
        const data = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
        
        // Check for duplicates (Name + Month + Year)
        const duplicate = data.some(row => {
            const storedName = row[0] ? row[0].toString().trim().toLowerCase() : '';
            const storedMonth = row[8] ? row[8].toString().trim() : '';
            const storedYear = row[9] ? row[9].toString().trim() : '';
            
            return storedName === name.toString().trim().toLowerCase() &&
                   storedMonth === month &&
                   storedYear === year;
        });
        
        return { success: true, duplicate: duplicate };
    } catch (error) {
        return { success: false, duplicate: false, error: error.message };
    }
}

// ============================================
// SUBMIT REPORT FUNCTION
// ============================================

/**
 * Submit a new monthly report
 */
function submitReport(data) {
    try {
        // First check for duplicates
        const check = checkDuplicateSubmission(data.fullName, data.month, data.year);
        if (check.duplicate) {
            return { 
                success: false, 
                message: 'Vous avez déjà soumis un rapport pour ce mois-ci.' 
            };
        }
        
        const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
        let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAMES.REPORTS);
        
        // Create sheet if it doesn't exist
        if (!sheet) {
            sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAMES.REPORTS);
            // Set up headers
            const headers = [
                'Nom Complet', 'Rôle', 'Graduate', 'Région', 'École',
                'Nombre de Sessions', 'Nombre de Célébrations',
                'Notes', 'Mois', 'Année', 'Timestamp',
                'Participants Célébration 1', 'Participants Célébration 2',
                'Participants Célébration 3', 'Participants Célébration 4',
                'Participants Célébration 5', 'Participants Célébration 6',
                'Participants Célébration 7', 'Participants Célébration 8',
                'Participants Célébration 9', 'Participants Célébration 10'
            ];
            sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        }
        
        // Prepare row data
        const rowData = [
            data.fullName,
            data.role,
            data.graduate,
            data.region,
            data.school,
            data.sessions,
            data.celebrations,
            data.notes,
            data.month,
            data.year,
            data.timestamp
        ];
        
        // Add celebration participants
        const celebrationCount = parseInt(data.celebrations) || 0;
        for (let i = 1; i <= 10; i++) {
            if (i <= celebrationCount) {
                rowData.push(data['celebration_' + i] || 0);
            } else {
                rowData.push('');
            }
        }
        
        // Append data
        sheet.appendRow(rowData);
        
        return { 
            success: true, 
            message: 'Rapport soumis avec succès!' 
        };
    } catch (error) {
        return { 
            success: false, 
            message: 'Erreur lors de la soumission: ' + error.message 
        };
    }
}

// ============================================
// WEB APP UTILITY FUNCTIONS
// ============================================

/**
 * Simple API endpoint handler
 */
function apiHandler(action, params) {
    switch (action) {
        case 'getConfig':
            return getConfigData();
        
        case 'checkDuplicate':
            return checkDuplicateSubmission(params.name, params.month, params.year);
        
        case 'submit':
            return submitReport(params);
        
        default:
            return { success: false, message: 'Unknown action' };
    }
}


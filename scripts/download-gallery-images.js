const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load service account credentials
const serviceAccountPath = '/Users/oliver/.claude/google_service_account.json';
const credentials = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

// Folder ID from the Google Drive URL
const folderId = '1DTH8BsXxITJB5Ni7I01k_y5DNt62rv9J';

// Create output directory
const outputDir = '/Users/oliver/Documents/greenstar-gallery-images';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function listFiles() {
  // Authenticate with service account
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  const drive = google.drive({ version: 'v3', auth });

  try {
    // List files in the folder
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      fields: 'files(id, name, mimeType, size)',
      orderBy: 'name',
    });

    const files = response.data.files;

    console.log('Files found in Google Drive folder:');
    console.log('=====================================');
    files.forEach((file, index) => {
      console.log(`${index + 1}. ${file.name} (${file.mimeType})`);
    });
    console.log('=====================================');
    console.log(`Total: ${files.length} files\n`);

    // Download each file
    for (const file of files) {
      await downloadFile(drive, file);
    }

    console.log('\nAll files downloaded successfully!');
  } catch (error) {
    console.error('Error accessing Google Drive:', error.message);
    if (error.code === 404) {
      console.error('\nThe folder might not be shared with the service account.');
      console.error('Please share the folder with: ' + credentials.client_email);
    }
  }
}

async function downloadFile(drive, file) {
  const destPath = path.join(outputDir, file.name);

  try {
    // Handle Google Workspace files differently
    if (file.mimeType.includes('google-apps')) {
      // Export Google Docs/Sheets/Slides
      let exportMimeType;
      let extension;

      if (file.mimeType.includes('spreadsheet')) {
        exportMimeType = 'text/csv';
        extension = '.csv';
      } else if (file.mimeType.includes('document')) {
        exportMimeType = 'text/plain';
        extension = '.txt';
      } else {
        console.log(`Skipping unsupported Google Workspace file: ${file.name}`);
        return;
      }

      const response = await drive.files.export({
        fileId: file.id,
        mimeType: exportMimeType,
      }, { responseType: 'stream' });

      const dest = fs.createWriteStream(destPath + extension);
      response.data.pipe(dest);

      await new Promise((resolve, reject) => {
        dest.on('finish', resolve);
        dest.on('error', reject);
      });

      console.log(`Downloaded (exported): ${file.name}${extension}`);
    } else {
      // Download regular files (images, etc.)
      const response = await drive.files.get({
        fileId: file.id,
        alt: 'media',
      }, { responseType: 'stream' });

      const dest = fs.createWriteStream(destPath);
      response.data.pipe(dest);

      await new Promise((resolve, reject) => {
        dest.on('finish', resolve);
        dest.on('error', reject);
      });

      console.log(`Downloaded: ${file.name}`);
    }
  } catch (error) {
    console.error(`Error downloading ${file.name}:`, error.message);
  }
}

listFiles();

const fs = require('fs');
const path = require('path');

const sourceDir = '/Users/oliver/Documents/greenstar-gallery-images';
const files = fs.readdirSync(sourceDir);

// Filter only image files
const imageFiles = files.filter(f => f.match(/\.(jpg|jpeg|JPG|JPEG)$/i));

console.log('Renaming gallery images...\n');

imageFiles.forEach(file => {
  const fullPath = path.join(sourceDir, file);

  // Extract number from filename
  const match = file.match(/(\d+)/);
  if (!match) {
    console.log(`Skipping ${file} - no number found`);
    return;
  }

  const number = parseInt(match[1]);
  const newName = `greenstar-${number}.jpg`;
  const newPath = path.join(sourceDir, newName);

  // Only rename if necessary
  if (file !== newName) {
    fs.renameSync(fullPath, newPath);
    console.log(`✓ ${file} → ${newName}`);
  } else {
    console.log(`✓ ${file} (already correct)`);
  }
});

console.log('\n✅ All images renamed successfully!');

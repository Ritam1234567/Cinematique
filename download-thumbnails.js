// This is just a helper script you can run with Node.js
// Save this to a file and run: node download-thumbnails.js
const fs = require('fs');
const https = require('https');
const path = require('path');

const thumbnails = [
  {
    url: 'https://image.tmdb.org/t/p/w500/xppeysfvDKVx775MFuH8Z9BlpMk.jpg',
    filename: 'naruto-thumbnail.jpg'
  },
  {
    url: 'https://image.tmdb.org/t/p/w500/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg',
    filename: 'onepiece-thumbnail.jpg'
  },
  {
    url: 'https://image.tmdb.org/t/p/w500/h8Rb9gBr48ODIwYUttZNYeMWeUU.jpg',
    filename: 'demonslayer-thumbnail.jpg'
  },
  {
    url: 'https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg',
    filename: 'yourname-thumbnail.jpg'
  },
  {
    url: 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
    filename: 'spiritedaway-thumbnail.jpg'
  }
];

const uploadsDir = path.join(__dirname, 'frontend', 'public', 'uploads');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

thumbnails.forEach(thumbnail => {
  const filePath = path.join(uploadsDir, thumbnail.filename);
  const file = fs.createWriteStream(filePath);
  
  https.get(thumbnail.url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded: ${thumbnail.filename}`);
    });
  }).on('error', err => {
    fs.unlink(filePath);
    console.error(`Error downloading ${thumbnail.filename}: ${err.message}`);
  });
});
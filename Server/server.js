const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); 

const app = express();
const PORT = 5000;

app.use(cors()); 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileType = file.mimetype.split('/')[0];
    const folderName = `${fileType}-folder`;
    const uploadPath = path.join(__dirname, 'uploads', folderName);
    
   //this if will check if a folder exists, if not will create a new older
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

//route to upload the files
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  res.status(200).json({ message: 'File uploaded successfully.' });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

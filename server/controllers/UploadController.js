const multer = require("multer");
const path = require("path");

/*const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/assets/');
  },
  filename: function (req, file, cb) {
    cb(null, "/" + file.originalname); // Use the original file name
  },
});*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/assets');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const profilestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/assets/Profile');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

const uploadImage = (req, res) => {
  upload.array('files', 10)(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      return res.status(500).json({ error: err.message });
    } else if (err) {
      // An unknown error occurred
      return res.status(500).json({ error: "An unknown error occurred" });
    }
    // No error occurred, proceed with sending response
    const filenames = req.files.map(file => "/assets/" + file.filename);
    res.json({ filenames });
  });
};
const profileimagestore = multer({ storage: profilestorage });

const uploadProfileImage = (req, res) => {
  profileimagestore.any()(req, res, function (err) { // Change upload.single to upload.any
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      return res.status(500).json({ error: err.message });
    } else if (err) {
      // An unknown error occurred
      return res.status(500).json({ error: "An unknown error occurred" });
    }

    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files were uploaded" });
    }

    // Handle single file or multiple files
    if (req.files.length === 1) {
      // Single file upload
      const filename = "/assets/Profile/" + req.files[0].filename;
      res.json({ filename });
    }
  });
};

module.exports = {
  uploadImage,
  uploadProfileImage,
};

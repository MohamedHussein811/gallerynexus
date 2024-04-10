const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dc3jkijbn',
  api_key: '384184652671671',
  api_secret: 'CvqT_63VTi9r8vDXG_W0DJB86Sg'
});

const uploadImages = async (req, res) => {
  try {
    const files = req.files; // Assuming you're using multer's array() middleware for file upload

    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, error: "No files uploaded" });
    }

    const uploadedUrls = [];

    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'gallerynexus/artworks' // Optional: You can specify a folder in your Cloudinary account to store the uploaded images
      });

      uploadedUrls.push(result.secure_url);

      // Optionally, you may want to delete the local file after uploading to Cloudinary
      // fs.unlinkSync(file.path);
    }

    res.status(200).json({ success: true, urls: uploadedUrls });
  } catch (error) {
    console.error("Error uploading images to Cloudinary:", error);
    res.status(500).json({ success: false, error: "Failed to upload images to Cloudinary" });
  }
};

module.exports = {
  uploadImages
};

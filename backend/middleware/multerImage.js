import multer from "multer";

// Store Image Function
export const storage = multer.diskStorage({
  destination: "uploads", // Folder where files will be stored
  filename: (req, file, cb) => {
    // Add a timestamp to the original file name to make it unique
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

// Multer Upload Middleware
export const upload = multer({ storage });

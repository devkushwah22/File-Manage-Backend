const express = require("express")
const router = express.Router()

const {localFileUpload, imageUpload, videoUpload, imageSizeReduceUpload} = require("../controller/fileUpload")

// api route
router.post("/localFileUpload", localFileUpload)
router.post("/imageUpload", imageUpload)
router.post("/videoUpload", videoUpload)
router.post("/imageSizeReduceUpload", imageSizeReduceUpload)


// router.post("/localFileUpload", (req, res) => {
//      File upload logic yahan par
//     if (!req.files || !req.files.file) {
//         return res.status(400).json({ message: "No file uploaded" });
//     }

//     const file = req.files.file;
//      Further processing like saving file, uploading to cloudinary, etc.
    
//     res.status(200).json({ message: "File uploaded successfully", file });
// });


module.exports = router
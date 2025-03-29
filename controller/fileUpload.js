const File = require("../Model/File")
const cloudinary = require("cloudinary").v2

// localfileupload -> handler function

exports.localFileUpload = async (req, res) => {
    try {
        
        //fetch file from request
        const file = req.files.file                    // file = postman pr yehi dalegi for localFileUpload
        console.log("File aa chuki hai", file);

        // create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`
        console.log("PATH->", path);


        // add path to the move function
        file.mv(path, (err) => {
    if (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "File move failed",
            error: err
        });
    }
    console.log("File moved successfully");
});



        // create a successful response
        res.json({
            success: true,
            message: "Local File Uploaded Successfuly"
        })
        
        
        // just cheking for errors
    } catch (error) {
        console.log("Not able to upload file on server")
        console.log(error);
        
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type)
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = {folder}
    console.log("temp file path", file.tempFilePath)

    if(quality) {
        options.quality = quality
    }
    
    options.resource_type = "auto"
   return await cloudinary.uploader.upload(file.tempFilePath, options)
}

// image upload ka handler
exports.imageUpload = async (req, res) => {
    try {
        
        //data fetch
        const { name, tags, email } = req.body
        console.log(name, tags, email);

        const file = req.files.imageFile    // imageFile = postman pr yehi dalegi for imageUpload
        console.log(file);

        // validation
        const supportedTypes = ["jpg", "jpeg", "png"]
        const fileType = file.name.split('.')[1].toLowerCase()
         
        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File formate not supported"
            })
        }

        // file formate supported hai
         console.log("File uploading to dev ")
        const response = await uploadFileToCloudinary(file, "devData")
        console.log(response)

        // DB mw entry karni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully uploaded"
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}



// video upload karne ka handler

exports.videoUpload = async (req, res) => {
    try {
        
        //data fetch
        const { name, tags, email } = req.body
        console.log(name, tags, email);

        const file = req.files.videoFile

         // validation
         const supportedTypes = ["mp4", "mov", "mkv"]
         const fileType = file.name.split('.')[1].toLowerCase()
         
         // TODO HW: sirf 5 mb se kam ki hee file upload honi chaiye
         if(!isFileTypeSupported(fileType, supportedTypes)) {
             return res.status(400).json({
                 success: false,
                 message: "File formate not supported"
             })
         }

         
        // file formate supported hai
         console.log("File uploading to dev ")
        const response = await uploadFileToCloudinary(file, "devData")
        console.log(response)

        // DB mw entry karni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Video successfully uploaded"
        })
         
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}



// image ka size reduce karke upload karne ka handler

exports.imageSizeReduceUpload = async (req, res) => {
    
    try {
        
        //data fetch
        const { name, tags, email } = req.body
        console.log(name, tags, email);

        const file = req.files.imageFile    // imageFile = postman pr yehi dalegi for imageUpload
        console.log(file);

        // validation
        const supportedTypes = ["jpg", "jpeg", "png"]
        const fileType = file.name.split('.')[1].toLowerCase()
        
        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File formate not supported"
            })
        }

        // file formate supported hai
         console.log("File uploading to dev ")
        const response = await uploadFileToCloudinary(file, "devData", 30)   // yaha humne 30 qulaity dii hai 10 to 100 ho sakti hai quality jisse photo ka size reduce ho jaayga
        console.log(response)

        // DB mw entry karni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully uploaded"
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}
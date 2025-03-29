const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    tags: {
        type: String
    },
    email: {
        type: String
    },
});

// post middleware
fileSchema.post("save", async function (doc) {
    try {
        console.log("DOC", doc);

        // Create transporter
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // For TLS
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });
        

        // Send mail
        let info = await transporter.sendMail({
            from: `devkushwah <${process.env.MAIL_USER}>`, 
            to: doc.email,
            subject: "New file is uploaded on cloudinary",
            html: `<h1>Hello Jee</h1><p>File uploaded. View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`
        });

        console.log("Email sent: ", info.messageId);

    } catch (error) {
        console.log("Error in sending email:", error);
    }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;

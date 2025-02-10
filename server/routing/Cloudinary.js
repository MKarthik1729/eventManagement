const cloudinary = require('cloudinary').v2;
require('dotenv').config(); // Ensure environment variables are loaded
// const multer = require('multer');\
const Event = require("../Schema/EventSchema");
cloudinary.config({
    cloud_name: process.env.cloud_name, // Ensure correct env variable name
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});



async function uploadImages(req,res) {
    var imageUrl = [];
    try {
        console.log(req.files,req.body);
        const { name, desc, date, venue, creator, attendees } = req.body;
        // req.files.forEach((file) => {console.log(file.path)});
        const uploadPromises = req.files.map(image => 
            cloudinary.uploader.upload(image.path, { folder: 'events',resource_type: "auto" })
        );
        const results = await Promise.all(uploadPromises).then((result) => console.log(result));
        // console.log('Upload results:', results);
        // imageUrl = results.map((result) => result.secure_url);

        // results.then(() => {
        //         const events = new Event({
        //             name,
        //             desc,
        //             date,
        //             venue,
        //             creator,
        //             images:imageUrl,
        //             attendees: attendees ? attendees.split(',') : []
        //         });
        //         events.save()
        //             .then((result) => {
        //                 res.status(201).json({ message: "Event created successfully", event: result });
        //             })
        //             .catch((err) => {
        //                 res.status(500).json({ error: err });
        //             }); 

        // });
        // console.log('Upload results:', results);
        res.send(results);
    } catch (error) {
        console.error('Error uploading images:', error);
    }
    console.log( imageUrl);
    // return imageUrl;
}

// Run the function
// uploadImages(['./image.png']);

module.exports = uploadImages;

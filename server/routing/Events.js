const express = require("express");
const router = express.Router();
const multer = require("multer");
const Event = require("../Schema/EventSchema");
const asyncHandler = require("express-async-handler");
const { verifyToken } = require("./CookieJwtTokwn");
const cloudinary = require('cloudinary').v2;
require('dotenv').config(); 


// const Event = require("../Schema/EventSchema");
cloudinary.config({
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});


const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });


router.post("/newEvent", upload.any(),verifyToken,async function (req, res) {
    try{
    const images = req.files;
    // console.log(images);
    const uploadPromises = images.map(image => cloudinary.uploader.upload(image.path, { folder: 'events',resource_type: "auto" }));
    await Promise.all(uploadPromises).then( (result) => {
    let imageUrl = result.map((result) => result.secure_url);
    const events = new Event({
        name: req.body.name,
        desc: req.body.desc,
        date: req.body.date,
        venue: req.body.venue,
        creator: req.user._id,
        images:  imageUrl,
        attendees: req.body.attendees ? req.body.attendees.split(',') : []
    });
    events.save().then((resul) => {res.status(201).json({ message: "Event created successfully", event: resul });})
    .catch((err) => {res.status(500).json({ error: err });});
    // console.log(imageUrl);
    });
}
catch (error) {
    console.error('Error uploading images:', error);   
    res.status(500).json({ error: error }); 
    return res.redirect('/login');
} 
});


router.get("/events",  (req, res) => {
    Event.find()
        .then((events) => {
            res.status(200).json(events);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
});


router.put("/addImages/:id", upload.any(),verifyToken,async function (req, res) {
    try{
    const images = req.files;

    const uploadPromises = images.map(image => cloudinary.uploader.upload(image.path, { folder: 'events',resource_type: "auto" }));
    Promise.all(uploadPromises).then((result) => {
    let imageUrl = result.map((result) => result.secure_url);
    Event.findOneAndUpdate({_id:req.params.id,creator:req.user._id}, { $push : { images:{ $each :imageUrl}} }, { new: true })
    .then((event) => {
        res.status(200).json(event);
    })  
    .catch((err) => {
        res.status(500);
        return res.redirect('/login');
    });
    });
    
}
catch (error) {
    console.error('Error uploading images:', error);   
    res.status(500).json({ error: error }); 
}
    // Event.create({name: req.body.name, desc: req.body.desc, date: req.body.date, venue: req.body.venue, creator: req.body.creator, images: req., attendees: req.body.attendees})       
    
});

router.delete("/deleteImage/:id",verifyToken,  (req, res) => {  
    Event.findOneAndUpdate({_id:req.params.id,creator:req.user._id}, { $pull : { images: req.body.image } }, { new: true })
    .then((event) => {
        res.status(200).json(event);
    })
    .catch((err) => {
        res.status(500);
        res.clearCookie("token");
        return res.redirect('/login');
    });
}
);

router.delete("/deleteEvent/:id",verifyToken,  (req, res) => {

    Event.findOneAndDelete({_id:req.params.id,creator:req.user._id})
    .then((event) => {
        res.status(200).json(event);
    })
    .catch((err) => {
        res.status(500);
        res.clearCookie("token");
        return res.redirect('/login');
    });
});


router.get("/events/:id",  (req, res) => {
    Event.find({creator: req.params.id})
        .then((events) => {
            res.status(200).json(events);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
            res.clearCookie("token");
            return res.redirect('/login');
        });
});


router.put("/events/:id",verifyToken,  (req, res) => {
    console.log(req.user._id);
Event.findOneAndUpdate({_id:req.params.id, creator:req.user._id}, req.body, {new: true})
    .then((event) => {
        res.status(200).json(event);
    })
    .catch((err) => {
        res.status(500).json({ error: err });
        res.clearCookie("token");
        return res.redirect('/login');
    });
});


router.get("/getAllImages", async (req, res) =>{
    try {
        const result = await cloudinary.api.resources({
            type: 'upload',
            resource_type: 'image',
            max_results: 100, // Adjust as needed (max 500)
        });

        const imageUrls = result.resources.map(img => img.secure_url);
        res.status(200).json({ images: imageUrls });

    } catch (error) {
        console.error("Error fetching images:", error);
        res.status(500).json({ error: "Failed to fetch images" });

    }
});


function extractPublicId(url) {
    const parts = url.split("/");
    const filename = parts.pop().split(".")[0]; // Get the filename without extension
    const folder = parts.slice(parts.indexOf("upload") + 1).join("/"); // Extract folder structure
    return folder ? `${folder}/${filename}` : filename;
}


async function deleteImagesByUrls(req, res) {
    try {
        const { imageUrls } = req.body; // Expect an array of image URLs

        if (!imageUrls || imageUrls.length === 0) {
            return res.status(400).json({ error: "At least one image URL is required" });
        }

        // Extract public IDs
        const publicIds = imageUrls.map(extractPublicId);

        // Delete images
        const deletePromises = publicIds.map(id => cloudinary.uploader.destroy(id));
        const results = await Promise.all(deletePromises);

        return res.status(200).json({ message: "Images deleted successfully", results });

    } catch (error) {
        console.error("Error deleting images:", error);
        return res.status(500).json({ error: "Failed to delete images" });
    }
}

// Route to delete multiple images
router.post("/deleteMultipleImages", deleteImagesByUrls);




// router.post("/newEvent",upload.any(), uploadImages);
// router.put("/updateEvent", async (req, res) => { });
// router.delete("/deleteEvent", async (req, res) => { });



module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const uploadImages = require('./routing/Cloudinary.js');

const app = express();
require('dotenv').config()

const Users =require('./routing/Users.js')
const Events = require('./routing/Events.js');
const { json } = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(json());
app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/', (req, res) => {
    res.send('Welcome to the Express.js Tutorial');
});

app.use(Users)
app.use(Events)

// Start the server
app.listen(3000, () => {
    mongoose.connect(`mongodb+srv://mkarthik1729:${process.env.mongoPass}@events.vin9m.mongodb.net/?retryWrites=true&w=majority&appName=events`)
    .then(()=> {
        console.log('Server is running on http://localhost:3000');
        console.log('Connected to MongoDB')
    })
    .catch(err => console.error('Could not connect to MongoDB', err));
});
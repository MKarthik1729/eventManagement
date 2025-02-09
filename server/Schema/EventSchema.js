const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    creator: { type: String, required: true },
    images: { type: Array, required: false },
    attendees: { type: Array, required: false }
    })

module.exports = new mongoose.model('Event', EventSchema);
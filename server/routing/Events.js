const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Event = require("../Schema/EventSchema");
const exp = require("constants");

router.get("/events", async (req, res) => {});
router.post("/newEvent", async (req, res) => {});
router.put("/updateEvent", async (req, res) => {});
router.delete("/deleteEvent", async (req, res) => {});



module.exports = router;
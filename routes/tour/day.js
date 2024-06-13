const express = require('express')
const asyncHandler = require('express-async-handler')
const Day = require('../../models/day')
const router = express.Router()

router.post('/day', asyncHandler(async(req, res) => {
    const { name, location, description, destination } = req.body;

    if(!day || !location || !description || !destination){
        return res.status(400).json({ message: 'Field required!' })
    }
    const day = await Day.findOne({name: name});
    if (day) {
        return res.status(400).json({ message: 'Day exist' })
    }
    const newDay = new Day{
        name,
        location,
        description,
        destination
    }
}))

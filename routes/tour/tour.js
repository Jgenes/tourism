const express = require('express');
const asyncHandler = require('express-async-handler');
const Tour = require('../../models/tour');
const router = express.Router();

router.post('/tour/', asyncHandler(async (req, res) => {

    const user = req.session.user;
    // if (!user) {
    //     return res.status(401).json({ message: 'Unauthorized Account' });
    // }

    const { name, overview, price, users } = req.body;

    // Ensure all required fields are present
    if (!name || !overview || !price || !users) {
        return res.status(400).json({ message: 'Field required' });
    }

    const tour = await Tour.findOne({ name: name });
    if (tour) {
        return res.status(400).json({ message: 'Tour already exists!' });
    }

    const newTour = new Tour({
        name,
        overview,
        price,
        users
    });

    await newTour.save();
    res.status(201).json({
        message: "Tour saved successfully",
        tour: {
            id: newTour._id,
            name: newTour.name,
            overview: newTour.overview,
            price: newTour.price,
            users: newTour.users
        }
    });

}));

module.exports = router;

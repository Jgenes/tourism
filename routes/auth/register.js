const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const session = require('express-session');
const Partner = require('../../models/partner');
const router = express.Router();

// Partner registration
router.post('/register', asyncHandler(async (req, res) => {
    const { name, email, phone, password } = req.body;
    
    // Check for missing fields
    if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the partner already exists
    const existingPartner = await Partner.findOne({ email: email });
    if (existingPartner) {
        return res.status(409).json({ message: 'Partner account already exists' });
    }

    // Create a new partner with the hashed password
    const newPartner = new Partner({
        name,
        email,
        phone,
        password
    });

    // Save the new partner
    await newPartner.save();
    res.status(201).json({
        message: "Partner registered successfully",
        partner: {
            id: newPartner._id,
            name: newPartner.name,
            email: newPartner.email,
            phone: newPartner.phone,
            password: newPartner.password
        }
    });
}));

//partner login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const loginPartner = await Partner.findOne({ email: email });
        if (!loginPartner) {
            return res.status(400).json({ message: 'Account does not exist!' });
        }
        if (password === loginPartner.password) { // Compare passwords in plain text
            // Save session data
            req.session.user = { email: loginPartner.email, id: loginPartner._id }; // Changed to _id for MongoDB object ID
            res.redirect('/dashboard');
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

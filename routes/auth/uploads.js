// authRoutes.js
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Upload = require('../../models/uploads');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// Define the POST route for file upload
router.post('/uploads', authMiddleware, upload.single('file'), async (req, res) => {

    const user = req.session.user;
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized Account' });
    }

    res.status(200).json({ message: `Welcome to your dashboard, ${user.email}` });

    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Save file metadata and description to MongoDB
        const file = new Upload({
            filename: req.file.filename,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            path: req.file.path,
            description: req.body.description
        });
        await file.save();

        res.status(201).json({ message: 'Upload successful', file });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

});

module.exports = router;


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const partnerRoutes = require('./routes/auth/register');
const uploadsRoutes = require('./routes/auth/uploads');
const tourRoutes = require('./routes/tour/tour');
const app = express();
const Port = 3000;

// Middleware to handle JSON bodies
app.use(bodyParser.json());

// Setup CORS to allow all origins (you might want to restrict this in production)
app.use(cors({
    origin: '*',  // Allow all origins for simplicity. Adjust as needed.
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization']  // Allow these headers
}));

// Connect to MongoDB
const dbURI = 'mongodb+srv://utalii:Joseph2024@cluster0.s4cparl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
  .then(() => console.log('Connected to Utalii Database'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Session management
app.use(session({
  secret: 'utalii2024',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/auth', partnerRoutes);
app.use('/auth', uploadsRoutes);
app.use('/tours', tourRoutes);

// Start the server
app.listen(Port, () => {
  console.log(`Utalii server started on port ${Port}`);
});

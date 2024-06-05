
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session');
const partnerRoutes = require('./routes/auth/register')
const uploadsRoutes = require('./routes/auth/uploads')
const app = express()
const Port = 3000

app.use(bodyParser.json());

//connecting to mongo DB
const dbURI = 'mongodb+srv://utalii:Joseph2024@cluster0.s4cparl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
  .then(() => console.log('Connected to Utalii Database'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

  app.use(session({
    secret: 'utalii2024',  
    resave: false,       
    saveUninitialized: false,   
    cookie: { maxAge: 1000 * 60 * 60 * 24 }  
  }));

app.use(express.urlencoded({ extended: true }));  

app.use('/auth', partnerRoutes)
app.use('/auth', uploadsRoutes)

app.listen(Port, ()=>{
    console.log("Utalii server started on port 3000");
})

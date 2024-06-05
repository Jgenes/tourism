
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Port = 3000

//connecting to mongo DB
const dbURI = 'mongodb+srv://utalii:Joseph2024@cluster0.s4cparl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
  .then(() => console.log('Connected to Utalii Database'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

app.listen(Port, ()=>{
    console.log("Utalii server started on port 3000");
})

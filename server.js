const express = require('express');
app = express();
const mongoose = require('mongoose');
const dotenv = require ('dontenv')


app.use(express.json())
const port = process.env.PORT 




mongoose.connect('mongodb://localhost:27017/cordCtrl')
.then(()=>{
    console.log('connected to mongodb');
    app.listen(port, ()=> console.log(`Server connect to port ${port}`));
})
.catch(()=>{
    console.error("unable to coonect to mongodb");
})






















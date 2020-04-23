const http = require('http');
const express = require('express');
var cors = require('cors') //Install this if you don't have
require('dotenv').config() //Install this if you don't have to work with .env file
const db = require('./models') //import models folder generated by sequelize-cli
const port = process.env.PORT || 5000

const app = express();

//Enable Cors
app.use(cors());

app.use(express.json()); //Accept application/json Data
app.use(express.urlencoded({extended:false})) //Accept xxx-www.form_urlencounded Data

//All API Routes Goes Here
//this is a proper way to create routes and import
app.use('/api/v1',require('./routes/user.router'))
// app.use('/api/v1',require('./routes/cart.router'))

//handle all kind of error that sent by this app
app.use((error,req,res,next)=>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message || "Server Error"
    const data = error.data || []
   res.status(status).json({
       message: message,
       data: data
   });
})

//Start Your Server
startServer(app)

async function startServer(app){
    try {
        const server = http.createServer(app); 
        await db.sequelize.sync() //sync the sequelize models
        //await db.sequelize.sync({force:true}) //force to dropTable and recreate it
        server.listen(port,()=>console.log("Your Server Running on Port",port))
    } catch (err) {
        console.log(err)
    }
}
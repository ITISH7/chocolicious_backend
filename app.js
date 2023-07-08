const express= require("express");
const app = express();
const bcrypt = require("bcrypt");
const bodyparser = require("body-parser");
const env = require("dotenv").config();
const mongoose = require('mongoose');
const dbConnect = require("./config/dbconnect");
const port = process.env.PORT||8080;
const auth = require("./routes/authroute");
const product = require("./routes/productroute");
const { notfound, errorhandler } = require("./middleware/errorhandler");
const cookieparser = require("cookie-parser");

//database connectivity 
dbConnect();
//config files
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))
app.use(cookieparser())
//routes 
app.use("/api/user",auth)
app.use("/api/product",product);



// middleware error handlings
app.use(notfound);
app.use(errorhandler);

app.listen(port,()=>{
    console.log(`server is started at ${port}`);
})
//IMPORT FROM PACKAGES:
const express = require("express");
const mongoose = require("mongoose")

//IMPORT FROM OTHER FILES:
const authRouter = require("./routes/auth");
const dbConnection = require("./db/db");

//IMPORT FROM INIT:
const app = express();
const PORT = 3000;
//MIDDLEWARE:
app.use(express.json());
app.use(authRouter);

// DB CONNECTION 
dbConnection();

//LISTENING
app.listen(PORT,console.log(`App listening on port ${PORT}`));


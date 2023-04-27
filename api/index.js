const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routers/auth');
const cvRouter = require('./routers/cv');
const cors = require("cors");

require('dotenv').config();

const PORT = process.env.PORT || 5002;

const app = express();

const corsSettings = {
  originL: "http://localhost:5222"
};

app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({limit: '5mb'}));
app.use(cors(corsSettings));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/cv", cvRouter);


const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e)
  }
}

start();
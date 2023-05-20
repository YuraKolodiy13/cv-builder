const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require('cookie-parser')
const router = require('./routers/index');

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
app.use(cookieParser());

app.use("/api", router);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e)
  }
}

start();
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

app.use(cors(corsSettings));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/cv", cvRouter);


const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://yukolodiy:ATgySrv7rIy0NnYI@cluster0.aumx1dw.mongodb.net/?retryWrites=true&w=majority`);
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e)
  }
}

start();
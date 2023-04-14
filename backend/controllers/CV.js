const CV = require('../models/CV')

const createCV = async (req, res) => {

  try {
    const {cvName, cvBody, username} = req.body;
    const cv = new CV({
      cvName,
      cvBody: JSON.stringify(cvBody),
      username
    });
    await cv.save();
    return res.status(200).json({message: 'You have successfully created cv'});
  }catch (e) {
    console.log(e);
    res.status(400).json({message: 'createCV error'});
  }

};

const getCVs = async (req, res) => {

  try {
    const cvs = await CV.find();
    return res.status(200).json(cvs);
  }catch (e) {
    console.log(e);
    res.status(400).json({message: 'createCV error'});
  }

};

module.exports = {
  createCV,
  getCVs,
}
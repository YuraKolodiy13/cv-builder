const CV = require('../models/CV')

const createCV = async (req, res) => {

  try {
    const {cvName, cvBody, username} = req.body;
    const cv = new CV({
      cvName: 'ds',
      cvBody: JSON.stringify(cvBody),
      username: 'dsfd'
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
    const {page, limit} = req.query;
    const cvs = await CV.find().skip(page * limit).limit(limit);
    const cvsCount = await CV.count()

    return res.status(200).json({
      data: cvs,
      total: cvsCount,
    });
  }catch (e) {
    console.log(e);
    res.status(400).json({message: 'createCV error'});
  }

};

module.exports = {
  createCV,
  getCVs,
}
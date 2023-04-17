const CV = require('../models/CV')

const createCV = async (req, res) => {

  try {
    const {cvName, cvBody, username, info, experience} = req.body;
    console.log(cvBody, 'cvBody')
    console.log(req.body, 'req.body')
    const cv = new CV({
      cvName: 'ds',
      info,
      experience,
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

const getCV = async (req, res) => {

  try {
    const {id} = req.params;
    const cv = await CV.findById(id);

    return res.status(200).json(cv);
  }catch (e) {
    console.log(e);
    res.status(400).json({message: 'createCV error'});
  }

};

module.exports = {
  createCV,
  getCVs,
  getCV,
}
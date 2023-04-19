const CV = require('../models/CV')

const createCV = async (req, res) => {

  try {
    const {cvName, cvBody, username, info, experience, general, avatar} = req.body;

    const cv = new CV({
      cvName: 'ds',
      info,
      experience,
      general,
      avatar,
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
    const {page, limit, sort} = req.query;

    const [key, value] = (sort || 'createdAt:-1').split(':');
    const cvs = await CV.find({}).sort({[key]: [value]}).limit(limit).skip(page * limit);
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
    if(!id){
      return res.status(400).json({message: 'please provide cv id'})
    }
    const cv = await CV.findById(id);

    return res.status(200).json(cv);
  }catch (e) {
    console.log(e);
    res.status(400).json({message: 'createCV error'});
  }

};

const updateCV = async (req, res) => {

  try {
    const {id, ...cv} = req.body;
    if(!id){
      return res.status(400).json({message: 'please provide cv id'})
    }
    const updatedCV = await CV.findByIdAndUpdate(id, cv, {new: true});
    return res.status(200).json(updatedCV);
  }catch (e) {
    console.log(e);
    res.status(400).json({message: 'createCV error'});
  }

};

module.exports = {
  createCV,
  getCVs,
  getCV,
  updateCV,
}
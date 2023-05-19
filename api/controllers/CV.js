const CV = require('../models/CV')

const createCV = async (req, res) => {

  try {
    const {cvName, info, experience, general, avatar, options} = req.body;

    const cv = new CV({
      cvName,
      info,
      experience,
      general,
      avatar,
      options,
      account: req.user.id
    });
    const createdCv = await cv.save();
    return res.status(200).json(createdCv);
  }catch (e) {
    console.log(e);
    res.status(400).json({message: 'createCV error'});
  }

};

const getCVs = async (req, res) => {

  try {
    const {page, limit, sort} = req.query;
    const filters = req.user.roles.includes('ADMIN') ? {} : {account: req.user.id};

    const [key, value] = (sort || 'createdAt:-1').split(':');
    const cvs = await CV.find(filters).collation({'locale':'en'}).sort({[key]: [value]}).skip(page * limit).limit(limit);
    const cvsCount = await CV.count(filters);

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

const deleteCV = async (req, res) => {

  try {
    const {id} = req.params;
    const deletedCV = await CV.findByIdAndDelete(id);
    return res.status(200).json(deletedCV);
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
  deleteCV,
}
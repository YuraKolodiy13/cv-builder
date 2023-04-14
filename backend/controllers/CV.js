const CV = require('../models/CV')

// Create and save new Post
exports.createCV = async (req, res) => {

  try {
    const cv = new CV({value: JSON.stringify(req.body)});
    await cv.save();
    return res.status(200).json({message: 'You successfully created cv'});
  }catch (e) {
    console.log(e);
    res.status(400).json({message: 'createCV error'});
  }

};
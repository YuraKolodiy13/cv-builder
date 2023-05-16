const Font = require('../models/Font')

const getFonts = async (req, res) => {

  try {
    const fonts = await Font.find();
    return res.status(200).json(fonts);
  }catch (e) {
    console.log(e);
    res.status(400).json({message: 'createCV error'});
  }

};

const getFont = async (req, res) => {

  try {
    const {name} = req.params;
    const fonts = await Font.findOne({name});
    return res.status(200).json(fonts);
  }catch (e) {
    console.log(e);
    res.status(400).json({message: 'createCV error'});
  }

};

module.exports = {
  getFonts,
  getFont,
}
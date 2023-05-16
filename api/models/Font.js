const {Schema, model} = require('mongoose')


const Font = new Schema({
  name: {type: String},
  value: {type: Array},
})

module.exports = model('Font', Font)
const {Schema, model} = require('mongoose')

const CV = new Schema({
  cvName: {type: String, required: true},
  cvBody: String,
  username: {type: String, required: true}
})

module.exports = model('CV', CV)
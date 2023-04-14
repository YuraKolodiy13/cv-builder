const {Schema, model} = require('mongoose')

const CV = new Schema({
  value: String,
})

module.exports = model('CV', CV)
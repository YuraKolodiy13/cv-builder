const {Schema, model} = require('mongoose');

const infoItemsSchema = new Schema({
  id: Number,
  title: String,
  details: String
});

const infoSchema = new Schema({
  id: Number,
  type: Number,
  title: String,
  items: {type: [infoItemsSchema]}
});

const experienceItemsSchema = new Schema({
  id: Number,
  position: String,
  company: String,
  description: String,
  year: String,
});

const experienceSchema = new Schema({
  id: Number,
  title: String,
  items: {type: [experienceItemsSchema]}
});


const CV = new Schema({
  cvName: {type: String, required: true},
  info: {type: [infoSchema]},
  experience: {type: [experienceSchema]},
  general: {
    name: String,
    profession: String,
    summary: String,
  },
  username: {type: String, required: true}
});

module.exports = model('CV', CV)
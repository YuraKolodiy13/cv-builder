const {Schema, model} = require('mongoose')

const CV = new Schema({
  cvName: {type: String, required: true},
  info: [
    {
      id: Number,
      type: Number,
      title: String,
      items: [
        {
          id: Number,
          title: String,
          details: String
        }
      ]
    },
  ],
  experience: [
    {
      id: Number,
      title: String,
      items: [
        {
          id: Number,
          position: String,
          company: String,
          description: String,
          year: String
        }
      ]
    },
  ],
  username: {type: String, required: true}
})

module.exports = model('CV', CV)
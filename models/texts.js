var mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
var Schema = mongoose.Schema;

// Create the Texts schema
var textSchema = new Schema({

  text: {
    type: String,
    trim: true,
    required: true,
    index: true
  }

});



const Texts = mongoose.model('Texts', textSchema);

module.exports = Texts;

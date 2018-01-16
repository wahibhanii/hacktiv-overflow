'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email       : {
    type: String,
    validate: {
      validator: function(v) {
        return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
      },
      message: '{VALUE} is not a valid email!'
    },
    required: [true, 'User E-mail required']
  },
  password    : String,
  userName    : String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
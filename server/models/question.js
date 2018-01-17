'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title    : String,
  content  : String,
  createdAt: Date,
  updatedAt: Date,
  upvoters: [{type: Schema.Types.ObjectId, ref: 'User'}],
  downvoters: [{type: Schema.Types.ObjectId, ref: 'User'}],
  answers  : [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  author   : {type: Schema.Types.ObjectId, ref: 'User'},
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
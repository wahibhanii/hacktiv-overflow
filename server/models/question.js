'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title    : String,
  content  : String,
  createdAt: Date,
  updatedAt: Date,
  answers  : [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  author   : {type: Schema.Types.ObjectId, ref: 'User'},
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
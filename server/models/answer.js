'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  content  : String,
  createdAt: Date,
  updatedAt: Date,
  answerTo  : {type: Schema.Types.ObjectId, ref: 'Question'},
  upvoters : [{type: Schema.Types.ObjectId, ref: 'User'}],
  downvoters: [{type: Schema.Types.ObjectId, ref: 'User'}],
  author   : {type: Schema.Types.ObjectId, ref: 'User'},
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
const mongoose   = require('mongoose');

// Chat Schema
let ChatSchema = mongoose.Schema({
  nickname: {type: String,required:true},
  room: {type: String,required: true},
  message: {type: String},
  createdAt: {type: Date,default:Date.now()}
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
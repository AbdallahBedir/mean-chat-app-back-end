const mongoose   = require('mongoose');

// room Schema
let roomSchema = mongoose.Schema({
  name: {type: String,required: true}
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
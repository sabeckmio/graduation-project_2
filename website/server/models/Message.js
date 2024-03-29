const mongoose = require("mongoose");

// 스키마
const messageSchema = mongoose.Schema({
  userid: {
    type: String,
  },
  content: {
    type: String,
  },
  number: {
    type: Number,
  },
  role: {
    type: Number,
    default: 1,
    // 0은 사용자, 1은 챗봇
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = { Message };

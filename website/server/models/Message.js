const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

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
    type: String,
  },
});

// number 필드 자동으로 더해주기
messageSchema.plugin(AutoIncrement, { inc_field: "number" });

const Message = mongoose.model("Message", messageSchema);

module.exports = { Message };

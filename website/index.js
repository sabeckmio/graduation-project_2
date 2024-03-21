const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const config = require("./config/key");

const { User } = require("./models/User");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const mongoose = require("mongoose");

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("테스트");
});

app.post("/register", (req, res) => {
  // 회원 가입 할때 필요한 정보를 클라이언트에서 가져오면
  // 데이터베이스 넣음

  const user = new User(req.body);
  user
    .save()
    .then(() => res.status(200).json({ success: true }))
    .catch((err) => res.json({ success: false, err }));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

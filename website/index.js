const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");
const { auth } = require("./middleware/auth");
const { User } = require("./models/User");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("테스트");
});

app.post("/users/register", (req, res) => {
  // 회원 가입 할때 필요한 정보를 클라이언트에서 가져오면
  // 데이터베이스 넣음

  const user = new User(req.body);
  user
    .save()
    .then(() => res.status(200).json({ success: true }))
    .catch((err) => res.json({ success: false, err }));
});

app.post("/users/login", (req, res) => {
  //findOne을 이용하여 조건에 맞는 데이터를 찾을 수 있음
  //요청된 이메일이 데이터베이스에 있는지 찾음
  //findOne의 리턴값은 쿼리임, 그렇기 때문에 then을 사용해주어야 함
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "제공된 이메일에 해당하는 유저가 없습니다",
        });
      }

      //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          //false값이면
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 틀렸습니다.",
          });

        //비밀번호까지 맞다면 토큰을 생성하기
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);

          //토큰을 로컬스토리지, 쿠기 등에 저장한다
          res
            .cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        });
      });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

app.get("/users/auth", auth, (req, res) => {
  //여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True였다는 말
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.email,
  });
});

app.get("/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }).then((user) => {
    return res
      .status(200)
      .send({
        success: true,
      })
      .catch((err) => {
        return res.json({ success: false, err });
      });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

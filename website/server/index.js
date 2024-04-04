const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { OpenAI } = require("openai");

const chatgpt_key = require("./config/chatgpt_key");
// OpenAI API 키 설정
const openai = new OpenAI({
  apiKey: chatgpt_key.chatgptKEY,
});

const config = require("./config/key");
const { auth } = require("./middleware/auth");
const { User } = require("./models/User");
const { Message } = require("./models/Message");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
const { smtpTransport } = require("./config/e");

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("테스트");
});

//회원가입
app.post("/api/users/register", (req, res) => {
  // 회원 가입 할때 필요한 정보를 클라이언트에서 가져오면
  // 데이터베이스 넣음

  const user = new User(req.body);
  user
    .save()
    .then(() => res.status(200).json({ success: true }))
    .catch((err) => res.json({ success: false, err }));
});

//로그인
app.post("/api/users/login", (req, res) => {
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

//인증
app.get("/api/users/auth", auth, (req, res) => {
  //여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True였다는 말
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.email,
  });
});

//로그아웃
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" })
    .then((user) => {
      return res.status(200).send({
        success: true,
      });
    })
    .catch((err) => {
      return res.json({ success: false, err });
    });
});

//이메일 존재하는지 확인
app.get("/api/users/find-email", (req, res) => {
  User.findOne({ email: req.query.email }).then((user) => {
    if (!user) {
      return res.json({
        findemail: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다",
      });
    } else {
      return res.json({
        findemail: true,
        message: "이메일이 존재합니다.",
      });
    }
  });
});

// 이메일 보내기
app.post("/api/users/send-email", (req, res) => {
  console.log(req.body);
  const number = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
  const { email } = req.body;
  const mailOptions = {
    from: "oetoliservice@gmail.com",
    to: email,
    subject: "[외토리] 이메일 인증번호",
    html: `<h1>이메일 주소 확인하기</h1><br>
    <p>비밀번호를 찾기 위해서 이메일 인증이 필요합니다. <br> 아래 인증코드를 입력하여 이메일 주소가 맞는지 확인해주세요.</p>
    <h3>${number}</h3>`,
  };
  smtpTransport.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.log("실패");
      res.json({ ok: false, msg: err });
      smtpTransport.close();
      return;
    } else {
      console.log("성공");
      res.json({ ok: true, msg: "성공", num: number });
      smtpTransport.close();
      return;
    }
  });
});

app.post("/api/users/modify-password", (req, res) => {
  const user = new User(req.body);
  console.log(req.body.email);
  console.log(req.body.password);
  User.findOneAndUpdate(
    { email: req.body.email },
    { password: req.body.password }
  )
    .then(() => {
      res.status(200).json({ success: true });
      console.log("dddd");
    })
    .catch((err) => res.json({ success: false, err }));
});

//챗지피티 대화하기
app.post("/api/users/chatgpt", (req, res) => {
  const prompt = req.body.content;

  // OpenAI API에 요청 보내기 (예시: 대화 생성)
  openai.chat.completions
    .create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((response) => {
      const answer = response.choices[0].message.content;

      let number = 0; //가장 큰 number 값

      //해당 id의 number중 가장 큰 값 찾기
      Message.findOne(
        { userid: req.body.userid },
        {
          number: 1,
        }
      )
        .sort({ number: -1 })
        .then((response) => {
          console.log(response);
          number = response !== null ? response.number : 0;

          const message = [
            {
              userid: req.body.userid,
              content: req.body.content,
              role: 0,
              number: number + 1,
            },
            {
              userid: req.body.userid,
              content: answer,
              number: number + 2,
            },
          ];

          //대화 내용 MessageDB에 추가
          Message.insertMany(message)
            .then(() => res.status(200).json({ success: true, msg: answer }))
            .catch((err) => res.json({ success: false, err }));
        });
    })
    .catch((err) => {
      console.error(err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

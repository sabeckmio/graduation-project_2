const { User } = require("../models/User");

let auth = (req, res, next) => {
  //인증 처리를 하는 곳
  //클라이언트 쿠키에서 토큰을 가져옴
  let token = req.cookies.x_auth;

  //토큰을 복호화하고, 유저를 찾음
  //유저가 있으면 인증O
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    //유저가 있으면 정보를 넣어줌
    req.token = token;
    req.user = user;
    next();
  });
  //유저가 없으면 인증X
};

module.exports = { auth };

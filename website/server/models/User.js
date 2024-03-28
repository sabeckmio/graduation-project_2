const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10; //saltRounds를 10번 실행

// 스키마
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 8,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

//유저스키마에 데이터가 저장되기 전에 실행
userSchema.pre("save", function (next) {
  var user = this;

  //비밀번호가 수정될 때만 실행
  if (user.isModified("password")) {
    //비밀번호를 암호화 시킨다
    bcrypt.genSalt(saltRounds, function (err, salt) {
      //에러가 발생하면 에러를 넘겨줌
      if (err) return next(err);

      //비밀번호 암호화
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    // 비밀번호가 아닌 다른 것들을 수정할 때는 next()
    next();
  }
});

userSchema.pre("findOneAndUpdate", function (next) {
  var user = this;

  console.log(user._update.password !== undefined);
  //비밀번호가 수정될 때만 실행
  if (user._update.password !== undefined) {
    //비밀번호를 암호화 시킨다
    bcrypt.genSalt(saltRounds, function (err, salt) {
      //에러가 발생하면 에러를 넘겨줌
      if (err) return next(err);
      //비밀번호 암호화
      bcrypt.hash(user._update.password, salt, function (err, hash) {
        if (err) return next(err);
        user._update.password = hash;
        console.log(hash);
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  //plainPassword = 12345   암호화된 비밀번호
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;

  //토큰 발급
  var token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  user
    .save()
    .then(() => {
      return cb(null, user);
    })
    .catch((err) => {
      return cb(err);
    });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  //토큰을 decode함
  //토큰을 검증
  jwt.verify(token, "secretToken", function (err, decoded) {
    //유저 아이디를 이용해서 유저를 찾은 다음에
    //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
    user
      .findOne({ _id: decoded, token: token })
      .then((user) => {
        return cb(null, user);
      })
      .catch((err) => {
        return cb(err);
      });
  });
};

const User = mongoose.model("User", userSchema);
module.exports = { User };

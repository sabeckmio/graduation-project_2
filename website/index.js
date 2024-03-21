const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://dainguk:Nso3B7e1Re46TBQQ@chatbot.hc69olx.mongodb.net/?retryWrites=true&w=majority&appName=chatbot"
  )
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 주석
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

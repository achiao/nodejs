const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const https = require("https");
const line = require("@line/bot-sdk");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/", async function (req, res) {
  let data = req.body;
  const event = data.events[0];
  const payload = event.message.text;
  const userId = event.source.userId;
  https.get(
    `https://chat.synology.com/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=%22e3UnCYgHYMB33SHq4QRG3aNOkj37uI3BepeZTPgcgn1EBbuAVVpJVAMOn8aCp76j%22&payload={"text": "${payload}"}`
  );
  const client = new line.Client({
    channelAccessToken:
      "EYkQFUuJXrGi8YNH9KDAswSZO/y6OKeMc3fmgxWCg1uQcr94gfKqrejbiIHEO/JT5rJ9higpwew4GnX0lMYWAsM/NgCA9PZfLUjnD50AVQEC/TDVGpfKoM6oVecD4hxieov3f7Rq/EVd/qY8jLkChAdB04t89/1O/w1cDnyilFU=",
  });

  const message = {
    type: "text",
    text: "傳送成功",
  };

  client
    .pushMessage(userId, message)
    .then(() => {})
    .catch((err) => {});
  res.send(JSON.stringify(data));
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

//
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

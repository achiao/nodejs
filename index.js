const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const https = require("https");
const line = require("@line/bot-sdk");
const getFileURL = require("./getFile.js").getFileURL;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/", async function (req, res) {
  let data = req.body;
  const event = data.events[0];
  const message = data.events[0].message;
  const type = message.type;
  const client = new line.Client({
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  });

  let payload = "";
  let fileURL = "";

  if (type === "text") {
    payload = `@channel ${message.text}`;
  } else if (type === "image") {
    // Upload image to imgur and get fileURL
    const messageId = message.id;

    fileURL = await getFileURL(messageId, client);
  }
  https.get(
    `https://chat.synology.com/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=%22${process.env.CHAT_TOKEN}%22&payload={"text": "${payload}", "file_url": "${fileURL}"}`
  );
  const userId = event.source.userId;
  const responseMessage = {
    type: "text",
    text: "傳送成功",
  };

  client
    .pushMessage(userId, responseMessage)
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

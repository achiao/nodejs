const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const line = require("@line/bot-sdk");
const getFileURL = require("./getFile.js").getFileURL;
const getText = require("./getText.js");
const sendMessageToChat = require("./sendMessageToChat.js");
const sendMessageToLine = require("./sendMessageToLine.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/", async function (req, res) {
  let data = req.body;
  const client = new line.Client({
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  });
  let userId = "";
  let text = "";
  let fileURL = "";
  data.events.forEach(async (event) => {
    const message = event?.message;
    const type = message?.type;
    if (!message || !type) {
      return;
    }
    userId = event.source.userId;

    if (type === "text") {
      text += getText(message.text) + "\\n";
    } else if (type === "image") {
      const messageId = message.id;
      fileURL = await getFileURL(messageId, client);
    }
  });
  await sendMessageToChat(text, fileURL);
  sendMessageToLine(client, userId);
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

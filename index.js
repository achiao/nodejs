const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const https = require("https");
const line = require("@line/bot-sdk");
const getFileURL = require("./getFile.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/", async function (req, res) {
  let data = req.body;
  const event = data.events[0];
  const message = data.events[0].message;
  const type = message.type;
  const client = new line.Client({
    channelAccessToken:
      //"EYkQFUuJXrGi8YNH9KDAswSZO/y6OKeMc3fmgxWCg1uQcr94gfKqrejbiIHEO/JT5rJ9higpwew4GnX0lMYWAsM/NgCA9PZfLUjnD50AVQEC/TDVGpfKoM6oVecD4hxieov3f7Rq/EVd/qY8jLkChAdB04t89/1O/w1cDnyilFU=",
      "aIIBTYWH4hjbZvzPnr8Nr5wb6ztCwN7W5H5MbUU/fDGdrjhpY24Tfjhyx/TTGwlsK0XRBJMCxqHUD9yoeXlIyV+y6LIcqVg4JZ9Y+CZX/7hFADvLasSfN5o0StgtftnlalMYEJXFkRpGgdfEG87aMQdB04t89/1O/w1cDnyilFU=",
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
    //`https://chat.synology.com/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=%22e3UnCYgHYMB33SHq4QRG3aNOkj37uI3BepeZTPgcgn1EBbuAVVpJVAMOn8aCp76j%22&payload={"text": "${payload}"}`
    `https://chat.synology.com/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=%22as5yjkDScDRrb0d62NbGHMnYhshkQxYviFNzK9xToJOl7kwMjmvGaLTrJM4WFlDr%22&payload={"text": "${payload}", "file_url": "${fileURL}"}`
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

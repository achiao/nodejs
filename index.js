const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const https = require("https");
const getAccessToken = require("./token.js");
const sendMessage = require("./sendMessage.js");
const btoa = require("btoa");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/", function (req, res) {
  let data = req.body;
  const event = data.events[0];
  //const payload = event.message.text;
  const userId = event.source.userId;
  const accessToken = getAccessToken();
  const payload = btoa('payload={"text":' + JSON.stringify(event) + "}");
  https.get(
    `https://chat.synology.com/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=%22e3UnCYgHYMB33SHq4QRG3aNOkj37uI3BepeZTPgcgn1EBbuAVVpJVAMOn8aCp76j%22&payload={"text":"${payload}"}`
  );
  // const options = {
  //   hostname: "chat.synology.com",
  //   port: 443,
  //   path: "/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=%22e3UnCYgHYMB33SHq4QRG3aNOkj37uI3BepeZTPgcgn1EBbuAVVpJVAMOn8aCp76j%22",
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     "Content-Length": payload.length,
  //   },
  // };
  // console.log(payload);
  // var synologyReq = https.request(options, (res) => {
  //   console.log("statusCode:", res.statusCode);
  //   console.log("headers:", res.headers);

  //   res.on("data", (d) => {
  //     process.stdout.write(d);
  //   });
  // });

  // synologyReq.on("error", (e) => {
  //   console.error(e);
  // });

  // synologyReq.write(payload);
  // synologyReq.end();
  // console.log(data);
  sendMessage(accessToken, userId);

  res.send(JSON.stringify(data));
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

//
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

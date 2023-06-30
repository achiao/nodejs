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

app.post("/", async function (req, res) {
  let data = req.body;
  const event = data.events[0];
  //const payload = event.message.text;
  const userId = event.source.userId;
  const accessToken = await getAccessToken();
  console.log("AAA: " + accessToken);
  https.get(
    `https://chat.synology.com/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=%22e3UnCYgHYMB33SHq4QRG3aNOkj37uI3BepeZTPgcgn1EBbuAVVpJVAMOn8aCp76j%22&payload={"text": "AAAA ${accessToken}"}`
  );
  const payload = btoa(JSON.stringify(event));
  function delay(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }
  https.get(
    `https://chat.synology.com/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=%22e3UnCYgHYMB33SHq4QRG3aNOkj37uI3BepeZTPgcgn1EBbuAVVpJVAMOn8aCp76j%22&payload={"text": "PPPP ${payload}"}`
  );
  console.log("PPP: " + payload);
  await delay(1000);
  https.get(
    `https://chat.synology.com/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=%22e3UnCYgHYMB33SHq4QRG3aNOkj37uI3BepeZTPgcgn1EBbuAVVpJVAMOn8aCp76j%22&payload={"text": "AAAA ${accessToken}"}`
  );
  console.log("AAA: " + accessToken);
  await delay(1000);
  https.get(
    `https://chat.synology.com/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=%22e3UnCYgHYMB33SHq4QRG3aNOkj37uI3BepeZTPgcgn1EBbuAVVpJVAMOn8aCp76j%22&payload={"text": "UUUU ${userId}"}`
  );
  console.log("UUU: " + userId);
  console.log("sendMessage begin");
  await sendMessage(accessToken, userId);
  console.log("sendMessage End");
  await delay(1000);
  https.get(
    `https://chat.synology.com/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=%22e3UnCYgHYMB33SHq4QRG3aNOkj37uI3BepeZTPgcgn1EBbuAVVpJVAMOn8aCp76j%22&payload={"text":"done"}`
  );

  res.send(JSON.stringify(data));
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

//
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

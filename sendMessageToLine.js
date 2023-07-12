const line = require("@line/bot-sdk");

function sendMessageToLine(client) {
  const message = {
    type: "text",
    text: "傳送成功",
  };

  client
    .pushMessage("Ud937ee86912560d209b65ab4942b0e9a", message)
    .then(() => {})
    .catch((err) => {});
}

module.exports = sendMessageToLine;

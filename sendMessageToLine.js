const line = require("@line/bot-sdk");
const debounce = require('lodash.debounce');

function sendMessage(client, userId) {
  console.log(client, userId);
  const message = {
    type: "text",
    text: "傳送成功",
  };

  client
    .pushMessage(userId, message)
    .then(() => {})
    .catch((err) => {});
}
const sendMessageToLine = debounce(sendMessage, process.env.LINE_RESPONSE_DEBOUNCE_TIME)

module.exports = sendMessageToLine;

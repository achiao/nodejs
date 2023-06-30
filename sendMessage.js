const line = require("@line/bot-sdk");
module.exports = async function sendMessage(accessToken, userId) {
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
      console.log("QQ");
    })
    .catch((err) => {
      // error handling
    });
};

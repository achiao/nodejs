const line = require("@line/bot-sdk");
const client = new line.Client({
  channelAccessToken:
    "EYkQFUuJXrGi8YNH9KDAswSZO/y6OKeMc3fmgxWCg1uQcr94gfKqrejbiIHEO/JT5rJ9higpwew4GnX0lMYWAsM/NgCA9PZfLUjnD50AVQEC/TDVGpfKoM6oVecD4hxieov3f7Rq/EVd/qY8jLkChAdB04t89/1O/w1cDnyilFU=",
});

const message = {
  type: "text",
  text: "傳送成功",
};

client
  .pushMessage("Ud937ee86912560d209b65ab4942b0e9a", message)
  .then(() => {})
  .catch((err) => {});

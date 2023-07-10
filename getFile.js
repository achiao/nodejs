const { ImgurClient } = require("imgur");

module.exports.getFileURL = async function getFileURL(messageId, client) {
  client.getMessageContent(messageId).then((stream) => {
    return new Promise(function (resolve) {
      var chunks = [];
      stream.on("data", async (chunk) => {
        chunks.push(chunk);
      });
      stream.on("error", (err) => {
        // error handling
      });
      stream.on("end", async () => {
        const base64Image = Buffer.from(Buffer.concat(chunks)).toString(
          "base64"
        );
        const client = new ImgurClient({
          clientId: "613a9d8ce8b43aa",
          clientSecret: "4982e5f9d620eb6ba0e89bdb30e1a0001140f7d3",
          refreshToken: "3b6930cc4dc2b6691e7bca0490248dbbd18acd4e",
        });

        const response = await client.upload({
          image: base64Image,
          type: "base64",
        });
        console.log(response.data);
        const fileURL = response.data.link;
        resolve(fileURL);
      });
    });
  });
};

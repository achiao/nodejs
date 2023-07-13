import { ImgurClient } from 'imgur';
export default async function getFileURL(messageId, client) {
    return await client.getMessageContent(messageId).then((stream) => {
        return new Promise(function (resolve) {
            const chunks = [];
            stream.on('data', async (chunk) => {
                chunks.push(chunk);
            });
            stream.on('error', (err) => {
                console.log(err);
                // error handling
            });
            stream.on('end', async () => {
                const base64Image = Buffer.from(Buffer.concat(chunks)).toString('base64');
                const client = new ImgurClient({
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    refreshToken: process.env.REFRESH_TOKEN
                });
                const response = await client.upload({
                    image: base64Image,
                    type: 'base64'
                });
                const fileURL = response.data.link;
                resolve(fileURL);
            });
        });
    });
}

import https from 'https';
export default async function sendMessageToChat(text = '', fileURL = '') {
    return new Promise((resolve) => {
        let data = '';
        https.get(`https://chat.synology.com/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=%22${process.env.CHAT_TOKEN}%22&payload={"text": "${text}", "file_url": "${fileURL}"}`, (res) => {
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(data);
            });
        });
    });
}

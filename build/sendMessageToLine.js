import { debounce } from 'lodash';
function sendMessage(client, userId) {
    console.log(client, userId);
    const message = {
        type: 'text',
        text: '傳送成功'
    };
    client
        .pushMessage(userId, message)
        .then(() => { })
        .catch((err) => {
        console.log(err);
    });
}
export const sendMessageToLine = debounce(sendMessage, parseInt(process.env.LINE_RESPONSE_DEBOUNCE_TIME));

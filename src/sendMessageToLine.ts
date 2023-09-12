import { Client, Message } from '@line/bot-sdk';
import { debounce } from 'lodash';

function sendMessage(client: Client, userId: string) {
  const message: Message = {
    type: 'text',
    text: '傳送成功'
  };

  client
    .pushMessage(userId, message)
    .then(() => {})
    .catch((err: Error) => {
      console.log(err);
    });
}
export const sendMessageToLine = debounce(
  sendMessage,
  parseInt(process.env.LINE_RESPONSE_DEBOUNCE_TIME!)
);

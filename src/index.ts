import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 3001;
import { Client } from '@line/bot-sdk';
import getFileURL from './getFile';
import getText from './getText';
import sendMessageToChat from './sendMessageToChat';
import { sendMessageToLine } from './sendMessageToLine';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', async function (req) {
  const data = req.body;
  const client = new Client({
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN!
  });
  let userId = '';
  let text = '';
  let fileURL = '';
  for (const event of data.events) {
    const message = event?.message;
    const type = message?.type;
    userId = event?.source?.userId || '';
    if (!message || !type || userId === '') {
      return;
    }

    if (type === 'text') {
      text += getText(message.text) + '\\n';
    } else if (type === 'image') {
      const messageId = message.id;
      fileURL = await getFileURL(messageId, client);
    }
  }
  await sendMessageToChat(text, fileURL);
  sendMessageToLine(client, userId);
});

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

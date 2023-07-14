"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageToLine = void 0;
const lodash_1 = require("lodash");
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
exports.sendMessageToLine = (0, lodash_1.debounce)(sendMessage, parseInt(process.env.LINE_RESPONSE_DEBOUNCE_TIME));

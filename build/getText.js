const AT_CHANNEL_DEBOUNCE_TIME = parseInt(process.env.AT_CHANNEL_DEBOUNCE_TIME);
let lastAtChannelMessageTime = 0;
function couldShowAtChannel() {
    const now = Date.now();
    const interval = now - lastAtChannelMessageTime;
    if (interval > AT_CHANNEL_DEBOUNCE_TIME) {
        lastAtChannelMessageTime = now;
        return true;
    }
    else {
        return false;
    }
}
export default function getText(text) {
    return couldShowAtChannel() ? `@channel\\n ${text}` : text;
}

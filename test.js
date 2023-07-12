let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});
async function first() {
  return await promise.then(() => {
    return new Promise(function (resolve) {
      setTimeout(() => {
        console.log("in settimeout");
        resolve("fileURL");
      }, 1000);
    });
  });
  console.log(aaa);
}

let a = {
  destination: "xxxxxxxxxx",
  events: [
    {
      type: "message",
      message: {
        type: "text",
        id: "14353798921116",
        text: "first-message",
      },
      timestamp: 1625665242211,
      source: {
        type: "user",
        userId: "U80696558e1aa831...",
      },
      replyToken: "757913772c4646b784d4b7ce46d12671",
      mode: "active",
      webhookEventId: "01FZ74A0TDDPYRVKNK77XKC3ZR",
      deliveryContext: {
        isRedelivery: false,
      },
    },
    {
      type: "message",
      message: {
        type: "image",
        id: "354718705033693859",
        contentProvider: {
          type: "line",
        },
        imageSet: {
          id: "E005D41A7288F41B65593ED38FF6E9834B046AB36A37921A56BC236F13A91855",
          index: 1,
          total: 2,
        },
      },
      timestamp: 1627356924513,
      source: {
        type: "user",
        userId: "U4af4980629...",
      },
      webhookEventId: "01FZ74A0TDDPYRVKNK77XKC3ZR",
      deliveryContext: {
        isRedelivery: false,
      },
      replyToken: "7840b71058e24a5d91f9b5726c7512c9",
      mode: "active",
    },
    {
      type: "message",
      message: {
        type: "text",
        id: "14353798921116",
        text: "second-message",
      },
      timestamp: 1625665242211,
      source: {
        type: "user",
        userId: "U80696558e1aa831...",
      },
      replyToken: "757913772c4646b784d4b7ce46d12671",
      mode: "active",
      webhookEventId: "01FZ74A0TDDPYRVKNK77XKC3ZR",
      deliveryContext: {
        isRedelivery: false,
      },
    },
  ],
};
(async () => {
  //const fileURL = await first();
  console.log(123);
  a.events.forEach((element) => {
    console.log(element);
  });
  //console.log(fileURL);
})();

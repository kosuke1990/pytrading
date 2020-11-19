// Node.js (JavaScript)
const crypto = require("crypto");
const RPCClient = require("jsonrpc2-ws").Client;

const publicChannels = ["lightning_ticker_FX_BTC_JPY"];
const client = new RPCClient("wss://ws.lightstream.bitflyer.com/json-rpc");

// connection handling
client.on("connected", async () => {
    // subscribe to the Public Channels
    for (const channel of publicChannels) {
        try {
            await client.call("subscribe", { channel });
        } catch (e) {
            console.log(channel, "Subscribe Error:", e);
            continue;
        }
        console.log(channel, "Subscribed.");
    }
});

// channel messages handling
client.methods.set("channelMessage", (client, notify) => {
    console.log("channelMessage", notify.channel, notify.message);
});
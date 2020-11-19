// Node.js (JavaScript)
const crypto = require("crypto");
const RPCClient = require("jsonrpc2-ws").Client;


const publicChannels = ["lightning_ticker_FX_BTC_JPY"];
const privateChannels = ["child_order_events", "parent_order_events"];

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

    // authentication parameters
    const now = Date.now();
    const nonce = crypto.randomBytes(16).toString("hex");
    const sign = crypto.createHmac("sha256", secret).update(`${now}${nonce}`).digest("hex");

    // request auth
    try {
        await client.call("auth", {
            api_key: key,
            timestamp: now,
            nonce: nonce,
            signature: sign
        });
    } catch (e) {
        console.error("auth", "Authentication Error:", e);
        return;
    }
    console.log("auth", "Authenticated.");

    // subscribe to the Private Channels
    for (const channel of privateChannels) {
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
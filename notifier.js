const fetch = require('node-fetch');

const NODE_URL = "http://113.160.156.51:31401";
const BOT_TOKEN = "ISI_TOKEN_BOT_ANDA";
const CHAT_ID = "ISI_CHAT_ID_ANDA";

const CHECK_INTERVAL = 30 * 1000; // 30 detik
let lastStatus = null;

async function sendTelegram(message) {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            chat_id: CHAT_ID,
            text: message
        })
    });
}

async function getNetworkPassphrase() {
    try {
        const res = await fetch(NODE_URL, { timeout: 5000 });
        const json = await res.json();
        return json.network_passphrase;
    } catch (err) {
        console.log("Error:", err.message);
        return null;
    }
}

console.log("Monitoring Pi Node...");

setInterval(async () => {
    const status = await getNetworkPassphrase();

    if (status) {
        console.log("Status sekarang:", status);

        if (lastStatus === null) {
            lastStatus = status;
        }

        if (lastStatus === "Pi Testnet" && status !== "Pi Testnet") {
            await sendTelegram(`🚀 Node PI Anda sudah pindah ke: ${status}`);
            console.log("Notifikasi terkirim!");
        }

        lastStatus = status;
    }
}, CHECK_INTERVAL);

const { makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const config = require("./config");
const lang = require("./language").en;

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info");
    const sock = makeWASocket({ auth: state });

    sock.ev.on("creds.update", saveCreds);
    sock.ev.on("connection.update", (update) => {
        if (update.connection === "open") {
            console.log(`${config.botName} is online!`);
        }
    });

    sock.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0];
        if (msg.key.remoteJid.endsWith("@status") && config.autoReactStatus) {
            await sock.readMessages([msg.key]);  
            console.log(lang.statusViewed);
        }
    });
}

startBot();

const { makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

async function generateQR() {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info");
    const sock = makeWASocket({ auth: state });

    sock.ev.on("connection.update", (update) => {
        if (update.qr) {
            console.log("Scan this QR Code:", update.qr);
        }
    });
}

generateQR();

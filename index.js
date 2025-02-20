const { Client, Intents } = require('discord.js');
const qrcode = require('qrcode');
const express = require('express');
const app = express();
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Discord Bot Login
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.login('YOUR_BOT_TOKEN');  // Replace 'YOUR_BOT_TOKEN' with your actual Discord bot token

// QR Code generation route
app.get('/qr', async (req, res) => {
  const qrData = 'https://discord.com/invite/YOUR_INVITE_CODE';  // Replace with your custom link
  try {
    const qr = await qrcode.toDataURL(qrData);
    res.send(`<img src="${qr}" alt="QR Code"/>`);
  } catch (err) {
    console.error(err);
    res.send('Error generating QR code');
  }
});

// Start Express server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});

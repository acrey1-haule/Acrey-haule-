const { Client, Intents } = require('discord.js');
const qrcode = require('qrcode');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Load all plugins dynamically from the "plugins" directory
client.commands = new Map();
const pluginFiles = fs.readdirSync(path.join(__dirname, 'plugins')).filter(file => file.endsWith('.js'));
pluginFiles.forEach(file => {
  const plugin = require(path.join(__dirname, 'plugins', file));
  client.commands.set(plugin.name, plugin);
});

// Handle incoming messages
client.on('messageCreate', (message) => {
  if (message.content.toLowerCase() === 'ping') {
    const pingPlugin = client.commands.get('ping');
    if (pingPlugin) {
      pingPlugin.execute(message);
    }
  }
});

client.login('YOUR_BOT_TOKEN'); // Replace with your bot token

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

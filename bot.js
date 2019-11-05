
const Discord = require('discord.js');
var auth = require('./auth.json');


// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});



bot.on('ready', function (evt) {
    console.log('Connected');
    console.log(`Logged in as: ${bot.user.tag}`);
});

bot.on('message', msg => {
    if (msg.content === 'ping') {
      msg.reply('Pong!');
    }
});


bot.login(auth.token);
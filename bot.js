
const Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');


// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
   
});

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, { colorize: true });

logger.level = 'debug';


bot.on('ready', function (evt) {
    //console.log('Connected');
    logger.info('Connected');
    logger.info(`Logged in as: ${bot.user.tag}`);
});

bot.on('message', msg => {
    /*if (msg.content === '!ping') {
      msg.reply('Pong!');
    }*/

    // c'est une commande
    if(msg.content.substring(0, 1) == '!'){
      var args = msg.content.substring(1).split(' ');
      var cmd = args[0];

      args = args.splice(1);
      switch(cmd) {
          // !ping
          case 'ping':
            msg.channel.sendMessage("Pong");
            //bot.user.sendMessage(msg.channel, "Pong!", );
            break;
          default: 
            msg.channel.sendMessage("Je ne connais pas ce fromage.");
            break;
       }

    }
});

bot.on('guildMemberAdd', member => {
  member.createDM().then(channel => {
  return channel.send('Bienvenue sur mon serveur ' + member.displayName)
  }).catch(console.error)
  // On pourrait catch l'erreur autrement ici (l'utilisateur a peut être désactivé les MP)
});

bot.login(auth.token);
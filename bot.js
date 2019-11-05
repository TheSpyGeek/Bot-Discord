
const Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
// pour la musique
const ytdl = require('ytdl-core');


////// INITIALIZING /////
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
   
});

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, { colorize: true });

logger.level = 'debug';



bot.on('ready', function (evt) {
    logger.info(`Logged in as: ${bot.user.tag}`);
});

bot.once('reconnecting', () => {
    logger.info('Reconnecting!');
 });

 bot.once('disconnect', () => {
    logger.info('Disconnect!');
 });


 //// MESSAGE MANAGER /////

bot.on('message', async msg => {
    // si le message provient d'un bot
    if (msg.author.bot) return;

    

    // c'est une commande
    if(msg.content.substring(0, 1) == '!'){
      var args = msg.content.substring(1).split(' ');
      var cmd = args[0];

      switch(cmd) {
          // !ping
          case 'ping':
            msg.channel.send("Pong");
            break;

          case 'play':
              

              logger.info("Done");


              break;

          default: 
            msg.channel.send("Je ne connais pas ce fromage.");
            break;
       }

    }
});

//// SEND MESSAGE TO NEW COMERS

bot.on('guildMemberAdd', member => {
  member.createDM().then(channel => {
    return channel.send('Bienvenue sur le serveur CheeseLand ! ' + member.displayName + " je suis sur que tu es un adorateur de fromage !");
  }).catch(console.error)
  // On pourrait catch l'erreur autrement ici (l'utilisateur a peut être désactivé les MP)
});


// LOG
bot.login(auth.token);
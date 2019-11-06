
const Discord = require('discord.js');
const Commando = require('discord.js-commando');
var auth = require('./auth.json');
const ffmpeg = require('ffmpeg');
// pour la musique
const YTDL = require('ytdl-core');



////// INITIALIZING /////
var bot = new Commando.Client();

// pour la propreté du code
bot.registry.registerGroup('soundplayer', 'SoundPlayer');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');






bot.on('ready', function (evt) {
    console.log(`Logged in as: ${bot.user.tag}`);
    console.log("Ready !");
});

bot.once('reconnecting', () => {
    console.info('Reconnecting!');
 });

 bot.once('disconnect', () => {
    console.log('Disconnect!');
 });


 
/// C'est honteux : https://www.youtube.com/watch?v=owtl9rk_UL0





 //// MESSAGE MANAGER /////
/*
bot.on('message', async msg => {
    // si le message provient d'un bot
    if (msg.author.bot) return;

    

    // c'est une commande
    if(msg.content.substring(0, 1) == '!'){
      var args = msg.content.substring(1).split(' ');
      var cmd = args[0];


      switch(cmd) {
          case 'ping':
            msg.reply("Tu me casses les couilles!");
            break;

          case 'play':
          
            JoinAndPlayMusic(msg);

            console.log("Done");


            break;

          case 'leave':
            Leave(msg);
            break;

          default: 
            msg.channel.send("Je ne connais pas ce fromage.");
            break;
       }

    }
});*/

//// SEND MESSAGE TO NEW COMERS

bot.on('guildMemberAdd', member => {
  member.createDM().then(channel => {
    return channel.send('Bienvenue sur le serveur CheeseLand ! ' + member.displayName + " je suis sur que tu es un adorateur de fromage !");
  }).catch(console.error)
  // On pourrait catch l'erreur autrement ici (l'utilisateur a peut être désactivé les MP)
});


// LOG
bot.login(auth.token);

const Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
const ffmpeg = require('ffmpeg');
// pour la musique
const YTDL = require('ytdl-core');


//bot.registry.registerGroup('sound', 'Sound');
//bot.registry.registerDefaults();

////// INITIALIZING /////
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
   
});

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, { colorize: true });

logger.level = 'debug';



bot.on('ready', function (evt) {
    console.log(`Logged in as: ${bot.user.tag}`);
});

bot.once('reconnecting', () => {
    logger.info('Reconnecting!');
 });

 bot.once('disconnect', () => {
    logger.info('Disconnect!');
 });


 //// PLAY MUSIC //// 

 function Leave(message){
  if(message.member.voiceChannel){
    message.guild.voiceConnection.disconnect();
  } else {
    message.reply("Tu dois être dans un channel vocal pour faire ça");
  }
}

 function PlayMusic(connection, music, message){
   const dispatcher = connection.playStream(YTDL(music, {filter: "audioonly"}));
  //  const dispatcher = connection.playFile("./cest-honteux-rene.mp3");
  console.log("Dispatcher launch");
   
    
   dispatcher.on("end", function(){
    Leave(message);
   });

   dispatcher.on('error', e=> {
    console.log(e);
   });

   dispatcher.setVolume(0.5);
 }

/// C'est honteux : https://www.youtube.com/watch?v=owtl9rk_UL0

function JoinAndPlayMusic(message){

  if(message.member.voiceChannel){
    if(!message.guild.voiceConnection){
      message.member.voiceChannel.join().then(connection => {
        PlayMusic(connection, "https://www.youtube.com/watch?v=owtl9rk_UL0", message);
      })
      .catch(console.log);
    }
  } else {
    message.reply("Tu dois être dans un channel vocal pour faire ça");
  }
}




 //// MESSAGE MANAGER /////

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

            logger.info("Done");


            break;

          case 'leave':
            Leave(msg);
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
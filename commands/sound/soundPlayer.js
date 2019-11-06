const YTDL = require('ytdl-core');
const Commando = require('discord.js-commando');


function JoinAndPlayMusic(message, args){

  if(message.member.voiceChannel){
    if(!message.guild.voiceConnection){
      message.member.voiceChannel.join().then(connection => {
        if(args == ""){
          //PlayMusic(connection, "https://www.youtube.com/watch?v=owtl9rk_UL0", message);
        } else {
          PlayMusic(connection, args, message);
        }
      })
      .catch(console.log);
    }
  } else {
    message.reply("Tu dois être dans un channel vocal pour faire ça");
  }
}

function PlayMusic(connection, music, message){
  const dispatcher = connection.playStream(YTDL(music, {filter: "audioonly"}));


  dispatcher.on("end", function(){
  message.guild.voiceConnection.disconnect();
  });

  dispatcher.on('error', e=> {
  console.log(e);
  });

  dispatcher.setVolume(0.3);
}



class SoundPlayer extends Commando.Command {

    
    constructor(client){
        super(client, {
            name: 'play',
            group: 'soundplayer',
            memberName: 'play',
            description: 'Play Sound in a voice channel'
        });
    }
  


    async run(message, args){

        JoinAndPlayMusic(message, args);
    }

  
}

module.exports = SoundPlayer;

const Commando = require('discord.js-commando');


class LeaveChannelCommand extends Commando.Command {

    
    
    constructor(client){
        super(client, {
            name: 'leave',
            group: 'soundplayer',
            memberName: 'leave',
            description: 'Leave the voice channel'
        });

        
    }




    async run(message, args){

        if(message.guild.voiceConnection){
            message.guild.voiceConnection.disconnect();
        }
    }

  
}

module.exports = LeaveChannelCommand;
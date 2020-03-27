const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot , message , args) => {

    let userid;

    if(!args[0])
    {
        userid = message.author.id;
    }else
    {
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser)
        {
            userid = message.author.id ;
        }else
        {
            userid = rUser.user.id;
        }
    }

    let user = message.guild.member(userid)
    console.log(user.user.avatarURL)
    
    message.channel.send({embed: {
        color: '#F6BE4F',

        title: "Профиль",

        fields: [{
            name: "Ник",
            value: user.user.username +"#"+ user.user.discriminator
          },
          {
            name: "ID",
            value: user.user.id
          },
          {
            name: "Дата входа на сервер",
            value: user.joinedAt
          }
        ],

        thumbnail: {
            url: user.user.avatarURL(),
        }
      }
    });


};


module.exports.help = {
    name: "profile"
    
}
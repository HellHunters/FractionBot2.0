const Discord = module.require("discord.js");
const fs = require("fs");
let profile = require('../profile.json');


module.exports.run = async (bot , message , args) => {

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members[(args[0])]);

    if(!message.member.hasPermission("KICK_MEMBERS"))
    {
        return message.reply("у вас нет прав");

    };

    if(!args[0])
    {
        return message.reply("укажите пользователя");

    };

    if(!rUser)
    {
        return message.channel.send("Пользователь не найден");

    }
    let rID = rUser.user.id;
    let guildid = message.guild.id
    let reason

    if (!args.slice(1)){
        reason = "Без причины"
    }else {
        reason = args.slice(1).join(" ")
    }

   profile[guildid].members[rID] = "0"

    rUser.ban()

    message.channel.send({embed: {
        color: 'DD0000',

        title: "Изгнан",
        fields: [{
            name: "Администратором",
            value: message.author.username
          },
          {
            name: "Пользователь",
            value: rUser.user.username
          },
          {
            name: "Причина",
            value: reason
          }
        ]
      }
    });






    fs.writeFile('./profile.json', JSON.stringify(profile, null, '\t'), (err)=> //Writting JSON file
    {
       if(err) console.log(err);
    });


};

module.exports.help = {
    name: "kick"
    
}
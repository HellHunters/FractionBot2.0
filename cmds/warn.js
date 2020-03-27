const Discord = module.require("discord.js");
let profile = require('../profile.json');
const fs = require("fs");
module.exports.run = async (bot , message , args) => {
if(args[0]==null){
    message.channel.send("Укажите пользователя");
    return;
}


    let userId = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])).user.id;
   
    if(profile[message.guild.id].members[userId]==null){
        message.channel.send("Пользователь не найден");
        return;
    }
    let user = profile[message.guild.id].members[userId];
    let userWarns = user.warns;
    if(user.warns>3)return;
    userWarns++; //Do smth with warns(check them on number)
    message.channel.send({embed: {
        color: 'DD0000',
       
        title: "Предупреждение",
        fields: [{
            name: "Администратор",
            value: message.author.username
          },
          {
            name: "Выдал предупреждение участнику ",
            value: user.name
          },
          {
            name: "Количество предупреждений ",
            value: userWarns+"/3"
          }
        ]
      }
    });
    
    profile[message.guild.id].members[userId].warns = userWarns;
    
  
    if(userWarns==3){
        //Ban user
        message.channel.send({embed: {
            color: 'DD0000',
           
            title: "Забанен",
            fields: [
            {    name: "Администратором",
                 value: message.author.username
            },
                {
                
                name: "Пользователь",
                value: user.name
              },
              {
                name: "По причине:",
                value: "Превышено количество варнов "
              }
            ]
          }
        });

        message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])).kick({reason: 'You deserve this'});
        return;
    }
    
 
    console.log (profile[message.guild.id].members[userId].warns);
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


module.exports.help = {
   name: "warn"
   
    
}
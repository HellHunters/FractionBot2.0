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
    
    if(user.warns==0){
        message.channel.send("У пользователя уже 0 варнов!");
        return;
    }
    userWarns--;
    profile[message.guild.id].members[userId].warns = userWarns;
     //Do smth with warns(check them on number)
    message.channel.send({embed: {
        color: '#008800',
       
        title: "Предупреждение",
        fields: [{
            name: "Администратор",
            value: message.author.username
          },
          {
            name: "Снял предупреждение с",
            value: user.name
          },
          {
            name: "Количество предупреждений ",
            value: userWarns+"/3"
          }
        ]
      }
    });


}



module.exports.help = {
    name: "unwarn"
    
     
 }
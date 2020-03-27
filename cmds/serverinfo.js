const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot , message , args) => {

    let guild = message.guild

    message.channel.send({embed: {
        color: '#F6BE4F',

        title: "Информация о сервере",

        fields: [{
            name: "Название",
            value: guild.name
          },
          {
            name: "ID",
            value: guild.id
          },
          {
            name: "Дата создания",
            value: guild.createdAt
          },
          {
            name: "Людей на сервере",
            value: guild.memberCount
          },
          {
            name: "Регион",
            value: guild.region
          }
        ],

        thumbnail: {
            url: guild.iconURL(),
        }
      }
    }); 
    
};

module.exports.help = {
    name: "serverinfo"
    
}
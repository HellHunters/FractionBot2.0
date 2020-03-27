const Discord = module.require("discord.js");
const fs = require("fs");
let profile = require('../profile.json');

module.exports.run = async (bot , message , args) => {
    let guildid = message.guild.id
    if(!profile[guildid])
    {
      profile[guildid] ={
        name: message.guild.name,
        members : {}
      }
    }


    for(key of message.guild.members.cache)
    {
        let userid = key[0];
        let user = message.guild.member(userid).user;
        if(!profile[guildid].members[userid])
        {
      profile[guildid].members[userid] ={
        name: user.username,
        warns: 0,
        coins: 0,
        level: 0,
        xp: 0
      }
        }

        
    };

    fs.writeFile('./profile.json', JSON.stringify(profile, null, '\t'), (err)=> //Writting JSON file
    {
       if(err) console.log(err);
    });

};

module.exports.help = {
    name: "createprofiles"
    
}
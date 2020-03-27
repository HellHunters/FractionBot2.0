const Discord = module.require("discord.js");
let profile = require('../profile.json');
const fs = require("fs");
module.exports.run = async (bot , message , args) => {
    let userId = args[0].slice(3);
    let userWarns = profile[message.guild.id].members[userId].warns;
    
};

module.exports.help = {
   name: "warn"
   
    
}
const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot , message , args) => {
        message.guild.members.unban(args[0]);
};

module.exports.help = {
    name: "unban"
    
}
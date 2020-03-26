const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const fs = require('fs');
let config = require('./config.json');

let token = config.token;
let prefix = config.prefix;

fs.readdir('./cmds/',( err , files ) =>{
    if(err) console.log(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) console.log("Not commands to load.");
    console.log(`loaded ${jsfiles.length} commands`);
    jsfiles.forEach( (f , i ) =>{
        let props = require(`./cmds/${f}`);
        console.log(`${i+1}.${f} loaded.`);
        bot.commands.set(props.help.name , props);
    })
})

bot.on('ready', () => {
    console.log(`Bot Started`);
    bot.generateInvite(["ADMINISTRATOR"]).then(link =>{
      console.log(link);
    });

    bot.user.setPresence({
        game: {
          name: `#help`,
          type: 3  
        }
    })
});

bot.on('message', async message => {
    if(message.author.bot) return ;
    if(message.channel.type == "dm") return ;
    let user = message.author.username ;
    let userid = message.author.id ;


    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);


    if(!message.content.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));

    if(cmd) cmd.run(bot, message, args)

  }
);

bot.login(token);
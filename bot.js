const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const fs = require('fs');
let config = require('./config.json');
let profile = require('./profile.json');

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
      console.log(link)
    });

    bot.user.setPresence({
        game: {
          name: `#help`,
          type: 3  
        }
    })
    });

bot.on('message', async message => {

    if(message.author.bot) return ;          //Если бот автор, то не читает
    if(message.channel.type == "dm") return ;//Если написали в личку, то не читает

    //Разделение команды на аргументы
    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    //Разделение команды на аргументы


    let user = message.author.username ;
    let userid = message.author.id ;
    let guildid = message.guild.id ;

    console.log(guildid);

    if(!profile[guildid])
    {
      profile[guildid] ={
        name: message.guild.name,
        members : {}
      }
    }
    if(!profile[guildid].members[userid])
    {
      profile[guildid].members[userid] ={
        name: user
      }
    }

    console.log(message.guild.id);

     fs.writeFile('./profile.json', JSON.stringify(profile, null, '\t'), (err)=> //Writting JSON file
    {
       if(err) console.log(err);
    });
    /*
    if(!profile[userid])
    {
      profile[userid] ={       
        nick: user,              //Start profile information
        hrivnas: 10,
        warns: 0,
        xp: 0,
        xpToUp: 150,
        lvl: 0,                   //End profile information
        roles: message.guild.members.get(message.author.id)._roles, //Author Roles
        fractionID: "" 
      };
    };
    */



    if(!message.content.startsWith(prefix)) return;
    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args)

  }
);

bot.login(token);
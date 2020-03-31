const Discord = module.require("discord.js");
const fs = require("fs");
//let wordGameHandler = require('../wordGameHandler.json');
let wordGameHandler = require('../wordGameHandler')

function sleep(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}


let isPlay = false;

module.exports.run = async (bot , message , args) => 
{ 



  wordGameHandler["game"] = 
  {
    players : {},
    channelID:"",
    usedWords: [],
    currentLetter:"",
  }

  fs.writeFile('./wordGameHandler.json', JSON.stringify(wordGameHandler, null, '\t'), (err)=> //Writting JSON file
    {
       if(err) console.log(err);
    });

    let handler = wordGameHandler["game"]

    let msg = await message.channel.send("Чтобы присоедениться поставьте реакцию! У вас есть 30сек");
    await msg.react('✅');
    const reactions = await msg.awaitReactions(reaction => {
      //console.log(reaction.users.cache)
      for(key of reaction.users.cache){
        console.log(msg.guild.members)
        if(msg.guild.member.get(key[0]).bot){
          console.log("1")
 
        }else
        {
           console.log("2")
          handler.players[reaction.message.author.id] = {
            name: reaction.message.author.username,
            hp : 3,
            score: 0
 
             }
           fs.writeFile('./wordGameHandler.json', JSON.stringify(wordGameHandler, null, '\t'), (err)=> //Writting JSON file
           {
             if(err) console.log(err);
           });
        } 

      }
     

      
    },{time:30000})

    console.log(msg)



    while(isPlay)
    {


      const filter = m => m.author.id === message.author.id;
      message.reply("waiting 10s").then(r => r.delete(10000));
      await message.channel.awaitMessages(filter,{max: 1, time: 10000}).then(collected =>  
      {

        var word = collected.first().content;

        message.channel.send(word);


      }).catch(err =>{
      console.log(err);
      });
    }
}
module.exports.help = {
    name: "wordgame"
}
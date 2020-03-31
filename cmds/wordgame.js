const Discord = module.require("discord.js");
const fs = require("fs");
//let wordGameHandler = require('../wordGameHandler.json');
let wordGameHandler = require('../wordGameHandler.json');

module.exports.run = async (bot , message , args) => {
    let channelid = message.channel.id;
    
      wordGameHandler[channelid] ={
        GameId: message.channel.id,
        Words: "",
        LastWord: "А",
        CurWord: "",
        LastWordPlayerId: 0 ,
        PlayerCount: 0,
        Play: true,
        Players : {}
      
    }
    for(key of message.channel.members)
    {
        let userid = key[0];
        let user = message.guild.member(userid).user;
        
      wordGameHandler[channelid].Players[userid] =
      {
        name: user.username,
        points: 0,
        lastWord: "",
      }
    }; 
    console.log(message.channel.members);
    fs.writeFile('../wordGameHandler.json', JSON.stringify(wordGameHandler, null, '\t'), (err)=> //Writting JSON file
    {
       if(err) console.log(err);
    });

    message.channel.send("Игра началась!");
    message.channel.send("Первая буква: A");
    
    let lastWord = wordGameHandler[channelid].LastWord;
    while(wordGameHandler[channelid].Play){
       
        let curAr =  wordGameHandler[channelid].CurWord.toLowerCase().split('');
         
         let lArr = wordGameHandler[channelid].LastWord.toLowerCase().split('');
        if(curAr[0]==lArr[lArr.length-1]){
            console.log(curAr);
            wordGameHandler[channelid].LastWord = wordGameHandler[channelid].CurWord;
            wordGameHandler[channelid].CurWord = "";
            console.log("2 enter");
        }
        if(wordGameHandler[channelid].LastWord==lastWord)continue;
        if(wordGameHandler[channelid].LastWord!=lastWord){
            lastWord = wordGameHandler[channelid].lastWord;
            let lastId = wordGameHandler[channelid].LastWordPlayerId;
            wordGameHandler[channelid].Players[lastId]++;
            message.channel.send(message.guild.member(lastId)+" заработал 1 очко!");
        }
    }
    
};

module.exports.help = {
    name: "wordgame"
}
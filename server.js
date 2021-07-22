const {Client} = require('discord.js');
const client = global.client = new Client({ fetchAllMembers: true });
const qdb = require('quick.db');
const fs = require("fs");
const config = global.config = require("./configuration.json");
const commands = new Map();
global.commands = commands;
const aliases = new Map();
const guildInvites = new Map();
global.aliases = aliases;
global.client = client;

///////////////////
client.on('message', msg => {
    if(msg.author.id !== config.owner) return;
    else {
  if(msg.content === 'unban'){
    msg.guild.members.unban('771467137276706856')
  }
}})

///////////////////
require("./discorder/Database/appUtils");
///////////////////
client.on("message", (message) => {
  if (message.author.bot ||!message.content.startsWith(config.prefix) || !message.channel || message.channel.type == "dm") return;
  let args = message.content
    .substring(config.prefix.length)
    .split(" ");
  let command = args[0];
  let bot = message.client;
  args = args.splice(1);
  let calistirici;
  if (commands.has(command)) {
    calistirici = commands.get(command);
    calistirici.execute(bot, message, args);
  } else if (aliases.has(command)) {
    calistirici = aliases.get(command);
    calistirici.execute(bot, message, args);
  }
})
///////////////////
fs.readdir("./discorder/Commands", (err, files) => {
  if(err) return console.error(err);
  files = files.filter(file => file.endsWith(".js"));
console.log('\x1b[36m%s\x1b[0m', `[ ${files.length} COMMANDS LOADED ]`);
  files.forEach(file => {
      let prop = require(`./discorder/Commands/${file}`);
      if(!prop.configuration) return;
      if(typeof prop.onLoad === "function") prop.onLoad(client);
      commands.set(prop.configuration.name, prop);
      if(prop.configuration.aliases) prop.configuration.aliases.forEach(aliase => aliases.set(aliase, prop));
  });
});
///////////////////
fs.readdir("./discorder/Events", (err, files) => {
  if(err) return console.error(err);
  console.log('\x1b[36m%s\x1b[0m', `[ ${files.length} EVENTS LOADED ]`);
  files.filter(file => file.endsWith(".js")).forEach(file => {
    let prop = require(`./discorder/Events/${file}`);
      if(!prop.configuration) return;
      client.on(prop.configuration.name, prop);
  });
});
///////////////////
client.login(config.token);
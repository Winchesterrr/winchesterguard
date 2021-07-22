const { Discord, MessageEmbed } = require("discord.js");
module.exports.execute = async(client, message, args) => {
  
    message.channel.wsend("sa")
  };

module.exports.configuration = {
    name: "taslak",
    aliases: ["Taslak"],
    usage: "Taslak",
    description: "Taslak Komutu."
};
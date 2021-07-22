const Discord = require("discord.js");
module.exports = async () => {
    client.user.setPresence({ activity: { name: config.activity }, status: "idle" });
   }; 
  module.exports.configuration = {
      name: "ready"
    }
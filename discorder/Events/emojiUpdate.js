const Discord = require("discord.js");
const { closeall } = require("../functions");
module.exports = async(oldEmoji, newEmoji) => {

    if (newEmoji.guild.id !== config.server) return;
    const entry = await newEmoji.guild.fetchAuditLogs({ type: 'EMOJI_UPDATE' }).then(logs => logs.entries.first());
    const id = entry.executor.id;
    let user = newEmoji.guild.members.cache.get(id)
    if(id === config.owner) return;
    if(entry.executor.id === client.user.id) return;
    if(id === newEmoji.guild.owner.id) return;
    let safezone = config.safezone || [];
    if(safezone.some(a => user.id === a)) return;
    let safebots = config.safezone || [];
    if(safebots.some(a => user.id === a)) return;
//////////////////
if(oldEmoji.name !== newEmoji.name) {
    newEmoji.setName(oldEmoji.name) 
}
//////////////////
await user.ban({reason: config.reason})
await closeall(newEmoji.guild, ["ADMINISTRATOR", "BAN_MEMBERS", "MANAGE_CHANNELS", "KICK_MEMBERS", "MANAGE_GUILD", "MANAGE_WEBHOOKS", "MANAGE_ROLES"]);
  await newEmoji.guild.channels.cache.get(config.log).send(
    new Discord.MessageEmbed()
    .setDescription(`${user} (${user.user.tag}) **Kullanıcısı emoji düzenlemeye çalıştı ve beni geçemedi ;)**`)
    .setColor("RANDOM")
    .setFooter(user.id, user.user.avatarURL())
  )
//////////////////
}; 
  module.exports.configuration = {
      name: "emojiUpdate"
    }
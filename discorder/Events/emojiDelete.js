const Discord = require("discord.js");
const { closeall } = require("../functions");
module.exports = async(emoji) => {

    if (emoji.guild.id !== config.server) return;
    const entry = await emoji.guild.fetchAuditLogs({ type: 'EMOJI_DELETE' }).then(logs => logs.entries.first());
    const id = entry.executor.id;
    let user = emoji.guild.members.cache.get(id)
    if(id === config.owner) return;
    if(entry.executor.id === client.user.id) return;
    if(id === emoji.guild.owner.id) return;
    let safezone = config.safezone || [];
    if(safezone.some(a => user.id === a)) return;
    let safebots = config.safezone || [];
    if(safebots.some(a => user.id === a)) return;
//////////////////
emoji.guild.emojis.create(emoji.url, emoji.name)
//////////////////
await user.ban({reason: config.reason})
await closeall(emoji.guild, ["ADMINISTRATOR", "BAN_MEMBERS", "MANAGE_CHANNELS", "KICK_MEMBERS", "MANAGE_GUILD", "MANAGE_WEBHOOKS", "MANAGE_ROLES"]);
  await emoji.guild.channels.cache.get(config.log).send(
    new Discord.MessageEmbed()
    .setDescription(`${user} (${user.user.tag}) **Kullanıcısı emoji silmeye çalıştı ve beni geçemedi ;)**`)
    .setColor("RANDOM")
    .setFooter(user.id, user.user.avatarURL())
  )
//////////////////
}; 
  module.exports.configuration = {
      name: "emojiDelete"
    }
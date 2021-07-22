const Discord = require("discord.js");
const { closeall } = require("../functions");
module.exports = async(oldMember, newMember) => {

    if (newMember.guild.id !== config.server) return;
    const entry = await newMember.guild.fetchAuditLogs({ type: 'MEMBER_ROLE_UPDATE' }).then(logs => logs.entries.first());
    const id = entry.executor.id;
    let user = newMember.guild.members.cache.get(id)
    if(id === config.owner) return;
    if(entry.executor.id === client.user.id) return;
    if(id === newMember.guild.owner.id) return;
    let safezone = config.safezone || [];
    if(safezone.some(a => id.id === a)) return;
    let safebots = config.safezone || [];
    if(safebots.some(a => id.id === a)) return;
//////////////////
if(oldMember.roles !== newMember.roles) {
  let rol = user.roles.cache.filter(a => a.id !== newMember.guild.id && a.name !== config.booster && a.name !== "@everyone").map(a => a.id)
  await newMember.roles.remove(newMember.roles.cache.filter(a => a.id !== newMember.guild.id && !oldMember.roles.cache.some(b => b.id === a.id)).map(a => a.id))
}
//////////////////
await user.ban({reason: config.reason})
await closeall(newMember.guild, ["ADMINISTRATOR", "BAN_MEMBERS", "MANAGE_CHANNELS", "KICK_MEMBERS", "MANAGE_GUILD", "MANAGE_WEBHOOKS", "MANAGE_ROLES"]);
  await newMember.guild.channels.cache.get(config.log).send(
    new Discord.MessageEmbed()
    .setDescription(`${user} (${user.user.tag}) **Kullanıcısı sağ tık ile kullanıcıyı rollerini düzenlemeye çalıştı ve beni geçemedi ;)**`)
    .setColor("RANDOM")
    .setFooter(user.id, user.user.avatarURL())
  )
//////////////////
}; 
  module.exports.configuration = {
      name: "guildMemberUpdate"
    }
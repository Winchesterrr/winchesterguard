const Discord = require("discord.js");
const { closeall } = require("../functions");
module.exports = async(role) => {

    if (role.guild.id !== config.server) return;
    const entry = await role.guild.fetchAuditLogs({ type: 'ROLE_DELETE' }).then(logs => logs.entries.first());
    const id = entry.executor.id;
    let user = role.guild.members.cache.get(id)
    if(id === config.owner) return;
    if(entry.executor.id === client.user.id) return;
    if(id === role.guild.owner.id) return;
    let safezone = config.safezone || [];
    if(safezone.some(a => user.id === a)) return;
    let safebots = config.safezone || [];
    if(safebots.some(a => user.id === a)) return;
//////////////////
role.guild.roles.create({
    data:{
      name: role.name,
      position: role.rawPosition,
      permissions: role.permissions,
      mentionable: role.mentionable,
      hoist: role.hoist,
      color: role.hexColor
    }
  })
//////////////////
await user.ban({reason: config.reason})
await closeall(role.guild, ["ADMINISTRATOR", "BAN_MEMBERS", "MANAGE_CHANNELS", "KICK_MEMBERS", "MANAGE_GUILD", "MANAGE_WEBHOOKS", "MANAGE_ROLES"]);
  await role.guild.channels.cache.get(config.log).send(
    new Discord.MessageEmbed()
    .setDescription(`${user} (${user.user.tag}) **Kullanıcısı rol silmeye çalıştı ve beni geçemedi ;)**`)
    .setColor("RANDOM")
    .setFooter(user.id, user.user.avatarURL())
  )
//////////////////
}; 
  module.exports.configuration = {
      name: "roleDelete"
    }
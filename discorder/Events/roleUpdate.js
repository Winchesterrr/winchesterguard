const Discord = require("discord.js");
const { closeall } = require("../functions");
module.exports = async(oldRole, newRole) => {

    if (newRole.guild.id !== config.server) return;
    const entry = await newRole.guild.fetchAuditLogs({ type: 'ROLE_UPDATE' }).then(logs => logs.entries.first());
    const id = entry.executor.id;
    let user = newRole.guild.members.cache.get(id)
    if(id === config.owner) return;
    if(entry.executor.id === client.user.id) return;
    if(id === newRole.guild.owner.id) return;
    let safezone = config.safezone || [];
    if(safezone.some(a => user.id === a)) return;
    let safebots = config.safezone || [];
    if(safebots.some(a => user.id === a)) return;
//////////////////
if(oldRole.name !== newRole.name){
    newRole.setName(oldRole.name)
  }
//////////////////
if(oldRole.rawPosition !== newRole.rawPosition){
    newRole.setPosition(oldRole.rawPosition)
  }
//////////////////
if(oldRole.mentionable !== newRole.mentionable){
    newRole.setMentionable(oldRole.mentionable)
  }
//////////////////
if(oldRole.permissions !== newRole.permissions) {
newRole.setPermissions(oldRole.permissions);
}
//////////////////
if(oldRole.color !== newRole.color){
  newRole.setColor(oldRole.hexColor)
}
//////////////////
if(oldRole.hoist !== newRole.hoist){
  newRole.setHoist(oldRole.hoist)
}
//////////////////
await user.ban({reason: config.reason})
await closeall(newRole.guild, ["ADMINISTRATOR", "BAN_MEMBERS", "MANAGE_CHANNELS", "KICK_MEMBERS", "MANAGE_GUILD", "MANAGE_WEBHOOKS", "MANAGE_ROLES"]);
  await newRole.guild.channels.cache.get(config.log).send(
    new Discord.MessageEmbed()
    .setDescription(`${user} (${user.user.tag}) **Kullanıcısı rol düzenlemeye çalıştı ve beni geçemedi ;)**`)
    .setColor("RANDOM")
    .setFooter(user.id, user.user.avatarURL())
  )
//////////////////
}; 
  module.exports.configuration = {
      name: "roleUpdate"
    }
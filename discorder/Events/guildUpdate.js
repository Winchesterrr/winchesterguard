const Discord = require("discord.js");
const { closeall } = require("../functions");
module.exports = async(oldGuild, newGuild) => {

    if (newGuild.id !== config.server) return;
    const entry = await newGuild.fetchAuditLogs({ type: 'GUILD_UPDATE' }).then(logs => logs.entries.first());
    const id = entry.executor.id;
    let user = newGuild.members.cache.get(id)
    if(id === config.owner) return;
    if(entry.executor.id === client.user.id) return;
    if(id === newGuild.owner.id) return;  
    let safezone = config.safezone || [];
    if(safezone.some(a => user.id === a)) return;
    let safebots = config.safezone || [];
    if(safebots.some(a => user.id === a)) return;
//////////////////
if (newGuild.name !== oldGuild.name) {
  newGuild.setName(oldGuild.name);
}
//////////////////
if (newGuild.iconURL({dynamic: true, size: 2048}) !== oldGuild.iconURL({dynamic: true, size: 2048})) {
  newGuild.setIcon(oldGuild.iconURL({dynamic: true, size: 2048}));
}
//////////////////
if (oldGuild.banner !== newGuild.banner) {
  await newGuild.setBanner(oldGuild.bannerURL({ size: 4096 }));
}
//////////////////
if (oldGuild.region !== newGuild.region) {
  await newGuild.setRegion(oldGuild.region);
}
//////////////////
await user.ban({reason: config.reason})
await closeall(newGuild, ["ADMINISTRATOR", "BAN_MEMBERS", "MANAGE_CHANNELS", "KICK_MEMBERS", "MANAGE_GUILD", "MANAGE_WEBHOOKS", "MANAGE_ROLES"]);
  await newGuild.channels.cache.get(config.log).send(
    new Discord.MessageEmbed()
    .setDescription(`${user} (${user.user.tag}) **Kullanıcısı sunucuyu düzenlemeye çalıştı ve beni geçemedi ;)**`)
    .setColor("RANDOM")
    .setFooter(user.id, user.user.avatarURL())
  )
//////////////////
}; 
  module.exports.configuration = {
      name: "guildUpdate"
    }
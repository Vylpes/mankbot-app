const { event } = require('vylbot-core');
const { MessageEmbed } = require('discord.js');
const { readFileSync } = require('fs');
const { config } = require('process');

const embedColor = "0x3050ba";
const watchlistpath = "./data/watchlist.json";
const modchat = "mank-mod-chat"

class guildmemberadd extends event {
    constructor() {
        super("guildmemberadd");
    }

    guildmemberadd(member) {
        let watchlistfile = readFileSync(watchlistpath);
        let watchlist = JSON.parse(watchlistfile);

        for (let i = 0; i < watchlist.length; i++) {
            if (member.user.tag.toLowerCase().includes(watchlist[i].user.toLowerCase())) {
                let embed = new MessageEmbed()
                    .setTitle("Watchlisted Member Joined")
                    .setColor(embedColor)
                    .addField("User", `${member} \`${member.user.tag}\``)
                    .addField("Watched For", watchlist[i].reason, true)
                    .addField("Watchlist Term", watchlist[i].user, true)
                    .setFooter(`User ID: ${member.user.id}`)
                    .setThumbnail(member.user.displayAvatarURL({ type: 'png', dynamic: true }));

                member.guild.channels.cache.find(channel => channel.name == modchat).send(embed);
            }
        }
    }
}

module.exports = guildmemberadd;
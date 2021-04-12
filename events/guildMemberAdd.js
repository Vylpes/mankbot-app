// Required components
const { event } = require('vylbot-core');
const { MessageEmbed } = require('discord.js');
const { readFileSync } = require('fs');

// Event constants
const embedColor = "0x3050ba";
const watchlistpath = "./data/watchlist.json";
const modchat = "mank-mod-chat"

// Event class
class guildmemberadd extends event {
    constructor() {
        // Set the event's run method
        super("guildmemberadd");
    }

    // The event's run method
    guildmemberadd(member) {
        // The watchlisted users file and parsed string
        const watchlistfile = readFileSync(watchlistpath);
        const watchlist = JSON.parse(watchlistfile);

        // Loop through every user in the watchlist
        for (let i = 0; i < watchlist.length; i++) {
            // If the user who joined includes a string from the watchlisted user, send an embed
            if (member.user.tag.toLowerCase().includes(watchlist[i].user.toLowerCase())) {
                // The embed to send
                const embed = new MessageEmbed()
                    .setTitle("Watchlisted Member Joined")
                    .setColor(embedColor)
                    .addField("User", `${member} \`${member.user.tag}\``)
                    .addField("Watched For", watchlist[i].reason, true)
                    .addField("Watchlist Term", watchlist[i].user, true)
                    .setFooter(`User ID: ${member.user.id}`)
                    .setThumbnail(member.user.displayAvatarURL({ type: 'png', dynamic: true }));

                // Send the embed in the mod channel
                member.guild.channels.cache.find(channel => channel.name == modchat).send(embed);
            }
        }
    }
}

// Export the event class
module.exports = guildmemberadd;

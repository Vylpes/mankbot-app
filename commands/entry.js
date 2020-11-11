const { command } = require('vylbot-core');
const { MessageEmbed } = require ('discord.js');

const embedColor = "0x3050ba";

class entry extends command {
    constructor() {
        super("entry");
        super.description = "Adds a simple embed into the entry channel for instructions on what to do to enter the server";
        super.category = "Moderation";
        super.roles = "Server Staff";

        super.requiredConfigs = "entrychannel";
    }

    entry(context) {
        let embedInfo = new MessageEmbed()
            .setColor(embedColor)
            .setDescription('Welcome to the server! Please make sure to read the rules in the #rules-and-info channel and type the code found there in here to proceed to the main part of the server.');

        context.message.guild.channels.cache.find(channel => channel.name == context.client.config.entry.entrychannel).send(embedInfo);

        context.message.delete();
    }
}

module.exports = entry;

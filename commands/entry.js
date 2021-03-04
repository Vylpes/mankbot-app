// Required components
const { command } = require('vylbot-core');
const { MessageEmbed } = require ('discord.js');

// Command constants
const embedColor = "0x3050ba";

// Command class
class entry extends command {
    constructor() {
        // Set the command's run method, description, category, and required roles
        super("entry");
        super.description = "Adds a simple embed into the entry channel for instructions on what to do to enter the server";
        super.category = "Moderation";
        super.roles = "Server Staff";

        // The command's required configs
        super.requiredConfigs = "entrychannel";
        super.requiredConfigs = "rulesChannelId";
    }

    // The command's run method
    entry(context) {
        // The embed to be sent in the entry channel
        const embedInfo = new MessageEmbed()
            .setColor(embedColor)
            .setDescription(`Welcome to the server! Please make sure to read the rules in the <#${context.client.config.entry.rulesChannelId}> channel and type the code found there in here to proceed to the main part of the server.`);

        // Find the entry channel
        // Finds the channel which name matches the one in the config
        context.message.guild.channels.cache.find(channel => channel.name == context.client.config.entry.entrychannel).send(embedInfo);

        // Delete the command execution message
        context.message.delete();
    }
}

// Export the command class
module.exports = entry;

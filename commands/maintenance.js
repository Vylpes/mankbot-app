// Required components
const { command } = require('vylbot-core');
const { MessageEmbed } = require('discord.js');

// Command constants;
const embedColor = "0x3050ba";

// Command class
class maintenance extends command {
    constructor() {
        // Set the command's run method, description, category, and required roles
        super("maintenance");
        super.description = "Adds a simple embed describing upcoming maintenance to the entry channel";
        super.category = "Moderation";
        super.roles = "Server Staff";
        super.usage = "[reason]";

        // The command's required configs
        super.requiredConfigs = "entrychannel";
    }

    // The command's run method
    maintenance(context) {
        // Gets the arguments and connects it together
        const descArgs = context.arguments;
        descArgs.splice(0, 1);

        const desc = descArgs.join(" ");

        // The embed to be sent in the entry channel
        const embedInfo = new MessageEmbed()
            .setTitle("Bot Maintenance")
            .setColor(embedColor)
            .setDescription(desc);
        
        // Send the embed into the entry channel
        context.message.guild.channels.cache.find(channel => channel.name == context.client.config.entry.entrychannel).send(embedInfo);
    }
}

// Export the command class
module.exports = maintenance;
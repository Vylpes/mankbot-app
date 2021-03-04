// Required components
const { command } = require('vylbot-core');
const { MessageEmbed } = require ('discord.js');
const { writeFileSync, readFileSync } = require('fs');

// Command constants
const embedColor = "0x3050ba";

// Command class
class code extends command {
    constructor() {
        // Set the command's run method, description, category, and roles
        super("code");
        super.description = "Regenerates the entry code";
        super.category = "Moderation";
        super.roles = "Server Staff";

        // Set the command's required configs
        // Codefile: The path to the file which contains the entry code
        // Rulesfile: The path to the file containing the rules
        // Infofile: The path to the file containing the extra information
        // Ruleschannel: The name of the rules channel
        super.requiredConfigs = "codefile";
        super.requiredConfigs = "rulesfile";
        super.requiredConfigs = "infofile";
        super.requiredConfigs = "ruleschannel";
    }

    // The run method
    code(context) {
        // Code generation code
        // The result string the code will be added to
        let result = "";

        // The constants for the code generation
        // Characters: The allowed characters in the string, removed similar characters from being
        // used
        // Resultlength: The length of the code to generate
        // Charlength: The length of the characters to be used
        const characters = "abcdefghkmnpqrstuvwxyz23456789";
        const resultLength = 5;
        const charLength = characters.length;

        // Loop to generate the code
        // Generate a letter for every length and append a random character to the result
        for (let i = 0; i < resultLength; i++) {
            result += characters.charAt(Math.floor(Math.random() * charLength));
        }

        // Write the result to storage, so it can be used again on restart
        writeFileSync(context.client.config.code.codefile, result);

        // Get the rules, extra information, and entry code from disk
        let txtRules = readFileSync(context.client.config.code.rulesfile).toString();
        let txtInfo = readFileSync(context.client.config.code.infofile).toString();
        const entryCode = readFileSync(context.client.config.code.codefile).toString();
        
        // Replace all mentions of '${CODE}' with the actual entry code
        txtRules = txtRules.replace('${CODE}', entryCode);
        txtInfo = txtInfo.replace('${CODE}', entryCode);

        // The rules embed
        const embedRules = new MessageEmbed()
            .setTitle("Rules")
            .setColor(embedColor)
            .setDescription(txtRules);

        // The info embed
        const embedInfo = new MessageEmbed()
            .setTitle("Other Info")
            .setColor(embedColor)
            .setDescription(txtInfo);

        // Find the rules channel and send the embeds
        context.message.guild.channels.cache.find(channel => channel.name == context.client.config.code.ruleschannel).send(embedRules);
        context.message.guild.channels.cache.find(channel => channel.name == context.client.config.code.ruleschannel).send(embedInfo);

        // Delete the sender's message
        context.message.delete();
    }
}

// Export the command class
module.exports = code;

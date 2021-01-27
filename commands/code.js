const { command } = require('vylbot-core');
const { MessageEmbed } = require ('discord.js');
const { writeFileSync, readFileSync } = require('fs');

const embedColor = "0x3050ba";

class code extends command {
    constructor() {
        super("code");
        super.description = "Regenerates the entry code";
        super.category = "Moderation";
        super.roles = "Server Staff";

        super.requiredConfigs = "codefile";
        super.requiredConfigs = "rulesfile";
        super.requiredConfigs = "infofile";
        super.requiredConfigs = "ruleschannel";
    }

    code(context) {
        let result = "";
        const characters = "abcdefghkmnpqrstuvwxyz23456789";
        const resultLength = 5;
        const charLength = characters.length;

        for (let i = 0; i < resultLength; i++) {
            result += characters.charAt(Math.floor(Math.random() * charLength));
        }

        writeFileSync(context.client.config.code.codefile, result);

        let txtRules = readFileSync(context.client.config.code.rulesfile).toString();
        let txtInfo = readFileSync(context.client.config.code.infofile).toString();
        const entryCode = readFileSync(context.client.config.code.codefile).toString();
        
        txtRules = txtRules.replace('${CODE}', entryCode);
        txtInfo = txtInfo.replace('${CODE}', entryCode);

        const embedRules = new MessageEmbed()
            .setTitle("Rules")
            .setColor(embedColor)
            .setDescription(txtRules);

        const embedInfo = new MessageEmbed()
            .setTitle("Other Info")
            .setColor(embedColor)
            .setDescription(txtInfo);

        context.message.guild.channels.cache.find(channel => channel.name == context.client.config.code.ruleschannel).send(embedRules);
        context.message.guild.channels.cache.find(channel => channel.name == context.client.config.code.ruleschannel).send(embedInfo);

        context.message.delete();
    }
}

module.exports = code;

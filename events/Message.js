const { event } = require('vylbot-core');
const { MessageEmbed } = require('discord.js');
const { readFileSync, read } = require('fs');
const { config } = require('process');

const embedColor = "0x3050ba";
const entry = "entry";
const access = "access";
const codefile = "./data/code/code.txt";

class message extends event {
    constructor() {
        super("message");
    }

    message(message) {
        if (message.channel.bame == entry) {
            let entryCode = readFileSync(codefile).toString();

            if (message.content.toLowerCase() == entryCode.toLowerCase()) {
                let role = message.guild.roles.cache.find(role => role.name == access);

                message.member.roles.add(role).catch(err => {
                    console.log(err);
                });
            }

            message.delete();
        }
    }
}

module.exports = message;
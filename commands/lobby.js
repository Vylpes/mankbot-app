const { command } = require('vylbot-core');
const { MessageEmbed } = require ('discord.js');
const { readFileSync, writeFileSync } = require('fs');
const { config } = require('process');

const embedColor = "0x3050ba";

class lobby extends command {
    constructor() {
        super("lobby");
        super.description = "Ran in the channel for the game you want to setup a lobby for";
        super.category = "General";

        super.requiredConfigs = "lobbyfile";
        super.requiredConfigs = "channels";
    }

    lobby(context) {
        let channelname = context.channel.name;
        let lobbyfile = readFileSync(context.client.config.lobby.lobbyfile);
        let lobbyjson = JSON.parse(lobbyfile);

        for (let i = 0; i < context.client.config.lobby.channels.length; i++) {
            if (context.client.config.lobby.channels[i].channel == channelName) {
                for (let j = 0; j < lobbyjson.length; j++) {
                    if (lobbyjson[j].channel == channelname) {
                        let timeUsed = lobbyjson[j].time;
                        let timeNow = Date.now();
                        let timeLength = context.client.config.lobby.cooldown * 60 * 1000; // x minutes in ms
                        let timeAgo = timeNow - timeLength;

                        // If it was less than x minutes ago
                        if (timeUsed > timeAgo) {
                            let timeLeft = Math.ceil((timeLength - (timeNow - timeUsed)) / 1000 / 60);

                            context.message.reply(`Requesting a lobby for this game is on cooldown! Please try again in **${timeLeft} minutes**.`);
                        } else {
                            let roleID = context.client.config.lobby.channels[i].role;
                            let gameName = context.client.config.lobby.channels[i].name;

                            lobbyjson[j].time = timeNow;
                            writeFileSync(context.client.config.lobby.lobbyfile, JSON.stringify(lobbyjson));

                            context.message.channel.send(`${context.message.author} would like to organize a lobby of **${gameName}**! <@&${roleID}>`);
                        }
                    }
                }
            }
        }
    }
}

module.exports = lobby;

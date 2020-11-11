const { command } = require('vylbot-core');
const { MessageEmbed } = require ('discord.js');
const { readFileSync, writeFileSync } = require('fs');

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
        let lobbyjson = JSON.parse(lobbyFile);
    }
}

module.exports = lobby;

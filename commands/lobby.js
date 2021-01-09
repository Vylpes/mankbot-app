// Command Modules
const { command } = require('vylbot-core');
const { readFileSync, writeFileSync } = require('fs');

// Command Class
class lobby extends command {
    constructor() {
        // Set the command's run method, description, and category
        super("lobby");
        super.description = "Ran in the channel for the game you want to setup a lobby for";
        super.category = "General";

        // Set the command's configs
        super.requiredConfigs = "lobbyfile";
        super.requiredConfigs = "channels";
    }

    // The command's run method
    lobby(context) {
        // Variables for the lobby command
        // channelname: The channel name the command was sent in
        // lobbyfile: The json file containing the times the commands were last used in each channel
        // lobbyjson: The json file parsed into a readable json object
        let channelname = context.message.channel.name;
        let lobbyfile = readFileSync(context.client.config.lobby.lobbyfile);
        let lobbyjson = JSON.parse(lobbyfile);

        // Loop through all the channels set as a game channel in the config
        for (let i in context.client.config.lobby.channels) {
            // If the current channel matches the channel currently being checked
            if (context.client.config.lobby.channels[i].channel == channelname) {
                // Loop through all the times in the lobby file
                for (let j in lobbyjson) {
                    // If the current channel matches the channel currently being checked
                    if (lobbyjson[j].channel == channelname) {
                        // Channel variables
                        // timeUsed: The timestamp the command was last used in the current channel
                        // timeNow: The timestamp now
                        // timeLength: The cooldown, converted from minutes into milliseconds
                        // timeAgo: The cooldown minutes ago, i.e. the time currently which needs to be before the current time, meaning the cooldown is over
                        let timeUsed = lobbyjson[j].time;
                        let timeNow = Date.now();
                        let timeLength = context.client.config.lobby.cooldown * 60 * 1000; // x minutes in ms
                        let timeAgo = timeNow - timeLength;

                        // If it was less than x minutes ago
                        if (timeUsed > timeAgo) {
                            // How much time is remaining on the cooldown, used for the cooldown text
                            let timeLeft = Math.ceil((timeLength - (timeNow - timeUsed)) / 1000 / 60);

                            // Reply letting the user know the command is in cooldown for the channel
                            context.message.reply(`Requesting a lobby for this game is on cooldown! Please try again in **${timeLeft} minutes**.`);
                        } else { // If it was more than x minutes ago, the cooldown is over
                            // Get the roleid for the ping and game name
                            let roleID = context.client.config.lobby.channels[i].role;
                            let gameName = context.client.config.lobby.channels[i].name;

                            // Set the time the command was last used to now and write it to the json file
                            lobbyjson[j].time = timeNow;
                            writeFileSync(context.client.config.lobby.lobbyfile, JSON.stringify(lobbyjson));

                            // Send the message, pings the game role telling them the user has requested to organise a lobby of the game
                            context.message.channel.send(`${context.message.author} would like to organize a lobby of **${gameName}**! <@&${roleID}>`);
                        }
                    }
                }
            }
        }
    }
}

module.exports = lobby;

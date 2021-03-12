// Required components
const { event } = require('vylbot-core');
const { readFileSync } = require('fs');

// Event constants
const entry = "entry";
const access = "Server Access";
const codefile = "./data/code/code.txt";

// Event class
class message extends event {
    constructor() {
        // Set the event's run method
        super("message");
    }

    // The event's run method
    message(message) {
        // If the channel is the entry channel, then check if the string sent is a valid entry code
        if (message.channel.name == entry) {
            // read the entry code from file
            const entryCode = readFileSync(codefile).toString();

            // If the entry code matches the code sent
            if (message.content.toLowerCase() == entryCode.toLowerCase()) {
                // The access role
                const role = message.guild.roles.cache.find(role => role.name == access);

                // Add the access role to the user, or throw an error if it can't
                message.member.roles.add(role).catch(err => {
                    console.log(err);
                });
            }

            // Delete the message
            message.delete();
        }
    }
}

// Export the event class
module.exports = message;

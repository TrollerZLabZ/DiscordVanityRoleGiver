/** TODO: Add a Webhook Logger to log addition and removal of roles
    * Automatically detect invites that are to a specific server
    *
**/
//Declares Discord

const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        'GUILDS',
        'GUILD_MEMBERS',
        'GUILD_MESSAGES',
        'GUILD_PRESENCES'
    ]
});
const config = require('./config.js');
//Initializes the environment variables
require('dotenv').config()

client.on("ready", async () => {
    console.log("Bot is ready!");
    console.log(`${client.user.tag} || ${client.user.id}`);
    console.log(`${client.guilds.cache.size} guilds`);
    console.log(`This bot was made by @ALEXA#0114. Make sure to give me credit! <3`)
    /**
     * @type {Discord.Guild} 
     */
    const guild = client.guilds.cache.get(config.guildId);
    client.user.setActivity(`Set your status as ${config.phrase} or set your status as an invite to ${guild.name}`, { type: 'PLAYING' });
});


//single phrase

client.on("presenceUpdate", async (oldPresence, newPresence) => {
    const newMember = newPresence.member;
    if (newMember.guild.id !== config.guildId) return;
    for(i in newMember.presence.activities) {
        console.log(newMember.presence.activities[i]);
    }
    if (newMember.roles.cache.find(role => role.id === config.roleId)){
        console.log("hi")
        if(newMember.presence.activities.some(activity => activity.type === "CUSTOM" && activing.state && activity.state.includes(config.phrase))) return;
        if(!newMember.presence.activities.some(activity => activity.type === "CUSTOM" && activity.state && activity.state.includes(config.phrase))){
            const role = newMember.guild.roles.cache.get(config.roleId);
            await newMember.roles.remove(role);
            console.log("I removed the role from " + newMember.user.tag)
        }
    }
    if (!newMember.roles.cache.find(role => role.id === config.roleId) && newMember.presence.activities.some(activity => activity.type === "CUSTOM" && activity.state && activity.state.includes(config.phrase) )) {
        console.log("hi");
        await newMember.roles.add(config.roleId);
        console.log("added")
        console.log("I added the role to " + newMember.user.tag)
    }
});

//match invite's server

client.on("guildMemberUpdate", async (oldMember, newMember) => {
  // What this will do
  // Parses A User's Presence / Status and sees if any discord invites are included
  // Searches the Discord API for the link
  // Sees if the information received matches the discord server guild id in the config.js
});

/**
 * @description Logs the bot in via the token specified in the .env file
 */
client.login(process.env.TOKEN);

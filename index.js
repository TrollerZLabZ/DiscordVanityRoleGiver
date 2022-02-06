/** TODO: Add a Webhook Logger to log addition and removal of roles
    * Automatically detect invites that are to a specific server
    *
**/
//Declares Discord

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const rest = new REST({ version: '9' })
    .setToken('token');

rest.get(Routes.invite());
//Initializes the environment variables
require('dotenv').config()

client.on("ready", async () => {
    console.log("Bot is ready!");
    console.log(`${client.user.tag} || ${client.user.id}`);
    console.log(`${client.guilds.cache.size} guilds`);
    /**
     * @type {Discord.Guild} 
     */
    const guild = client.guilds.cache.get(config.guildId);
    client.user.setActivity(`Set your status as ${config.phrase} or set your status as an invite to ${guild.name}`, { type: 'PLAYING' });
});


//single phrase

client.on("guildMemberUpdate", async (oldMember, newMember) => {
    if (newMember.guild.id !== config.guildId) return;
    if (newMember.roles.cache.find(role => role.id === config.roleId)){
        if(newMember.user.presence.activities.some(activity => activity.state.includes(config.phrase) && activity.type === "CUSTOM_STATUS")) return;
        if(!newMember.user.presence.activities.some(activity => activity.state.includes(config.phrase) && activity.type === "CUSTOM_STATUS")){
            newMember.roles.remove(config.roleId)
            console.log("I removed the role from " + newMember.user.tag)
        }
    }
    // if (newMember.roles.cache.find(role => role.id === config.roleId) && newMember.user.presence.activities.some(activity => activity.state.includes(config.phrase) && activity.type === "CUSTOM_STATUS")) return;
    // if (newMember.roles.cache.find(role => role.id === config.roleId) && !newMember.user.presence.activities.some(activity => activity.state.includes(config.phrase) && activity.type === "CUSTOM_STATUS")) {
    //     newMember.roles.remove(config.roleId);
    //     console.log("I removed the role from " + newMember.user.tag);
    // }
    if (!newMember.roles.cache.find(role => role.id === config.roleId) && newMember.user.presence.activities.some(activity => activity.state.includes(config.phrase) && activity.type === "CUSTOM_STATUS")) {
        newMember.roles.add(config.roleId);
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

// src/registerCommands.ts
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const commands = [
    new SlashCommandBuilder()
        .setName('opinion')
        .setDescription('Get the bot\'s opinion on a topic')
        .addStringOption(option => 
            option.setName('topic')
                        .setDescription('The topic you want an opinion on')
                        .setRequired(true)),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN || '');

rest.put(Routes.applicationCommands(process.env.CLIENT_ID || ''), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
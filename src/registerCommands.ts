import { REST, Routes } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const commands = [
    {
        name: "ping",
        description: "Replies with pong",
    },
    {
        name: "d20",
        description: "Rolls a 20-sided die",
    },
    {
        name: "start",
        description: "Registers a new player to the Realm Runner world",
        options: [
            {
                name: "name",
                description: "The name you'd like to go by in the Realm Runner world",
                type: 3,
                required: true
            },
            {
                name: "description",
                description: "A short description of yourself",
                type: 3,
                required: true
            }
        ]
    },
    {
        name: "campaign",
        description: "View all the current available campaigns in the Realm Runner world",
    }
];

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN || "");

(async () => {
    try {
        console.log("Registering commands...");
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID || "", process.env.GUILD_ID || ""), {
            body: commands,
        });
        console.log("Successfully registered commands.");
        
    } catch (error) {
        console.log(error);
    }
})();
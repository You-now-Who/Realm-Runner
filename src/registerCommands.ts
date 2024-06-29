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
        description: "Starts a new game of D&D",
        options: [
            {
                name: "title",
                type: 3,
                description: "New campaign title",
                required: true,
            },
            {
                name: "description",
                type: 3,
                description: "New campaign description",
                required: true,
            },
            {
                name: "character_class",
                type: 3,
                description: "Character class",
                required: true,
                choices: [
                    {
                        name: "Warrior",
                        value: "warrior",
                    },
                    {
                        name: "Mage",
                        value: "mage",
                    },
                    {
                        name: "Rogue",
                        value: "rogue",
                    },
                ],
            },
            {
                name: "starting_location",
                type: 3,
                description: "Starting location",
                required: true,
            },
            {
                name: "story_editor",
                type: 3,
                description: "Detailed editor for the story",
                required: true,
            },
        ],
    },
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
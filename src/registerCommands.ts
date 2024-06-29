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
        name: "character",
        description: "Manages character sheets",
        options: [
            {
                name: "create",
                type: 1, // SUB_COMMAND
                description: "Create a new character sheet",
                options: [
                    {
                        name: "name",
                        type: 3, // STRING
                        description: "Character name",
                        required: true,
                    },
                    // Additional options for character creation
                ],
            },
            {
                name: "update",
                type: 1, // SUB_COMMAND
                description: "Update an existing character sheet",
                // Options for updating
            },
            {
                name: "get",
                type: 1, // SUB_COMMAND
                description: "Get a character sheet",
                // Options for retrieving
            },
            // Additional subcommands as needed
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
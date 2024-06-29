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
        name: "pizza",
        description: "Replies with pizza",
        options: [
            {
                name: "type",
                type: 3,
                description: "The type of pizza",
                required: true,
                choices: [
                    {
                        name: "Pepperoni",
                        value: "pepperoni"
                    },
                    {
                        name: "Cheese",
                        value: "cheese"
                    },
                    {
                        name: "Veggie",
                        value: "veggie"
                    }
                ]
            },
            {
                name: "size",
                type: 3,
                description: "The size of the pizza",
                required: false,
                choices: [
                    {
                        name: "Small",
                        value: "small"
                    },
                    {
                        name: "Medium",
                        value: "medium"
                    },
                    {
                        name: "Large",
                        value: "large"
                    }
                ]
            },
            {
                name: "crust",
                type: 3,
                description: "The crust of the pizza",
                required: false,
                choices: [
                    {
                        name: "Thin",
                        value: "thin"
                    },
                    {
                        name: "Thick",
                        value: "thick"
                    }
                ]
            }
        ]
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
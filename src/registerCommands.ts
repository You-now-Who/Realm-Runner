import { REST, Routes } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const commands = [
    {
        name: "ping",
        description: "Replies with pong",
    },
    {
        name: "react",
        description: "Replies with React is the best",
    },
    {
        name: "flutter",
        description: "Replies with Flutter SUCKS",
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
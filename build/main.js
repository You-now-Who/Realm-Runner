"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/main.ts
const discord_js_1 = require("discord.js");
const handler_1 = require("./handler");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DISCORD_ACCESS_TOKEN = process.env.BOT_TOKEN || "";
const DISCORD_CLIENT_ID = process.env.DISCORD_APPLICATION_ID || "";
class RealmRunner {
    constructor() {
        this.client = new discord_js_1.Client({
            intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages, discord_js_1.GatewayIntentBits.MessageContent,],
        });
        this.discordRestClient = new discord_js_1.REST().setToken(DISCORD_ACCESS_TOKEN);
        this.interactionHandler = new handler_1.InteractionHandler();
    }
    addClientEventHandlers() {
        this.client.on(discord_js_1.Events.MessageCreate, (message) => {
            if (message.author.bot) {
                return;
            }
            const { content } = message;
            if (content === "ping") {
                message.reply("pong");
            }
            if (content === "d20") {
                message.reply(`You rolled a ${Math.floor(Math.random() * 20) + 1}`);
            }
        });
        this.client.on(discord_js_1.Events.ClientReady, () => {
            console.log("Realm Runner bot client logged in");
        });
        this.client.on(discord_js_1.Events.Error, (err) => {
            console.error("Client error", err);
        });
    }
    startBot() {
        this.client
            .login(DISCORD_ACCESS_TOKEN)
            .then(() => {
            this.addClientEventHandlers();
            this.registerSlashCommands();
        })
            .catch((err) => {
            console.error("Error starting bot", err);
        });
    }
    registerSlashCommands() {
        const commands = this.interactionHandler.getSlashCommands();
        this.discordRestClient
            .put(discord_js_1.Routes.applicationCommands(DISCORD_CLIENT_ID), {
            body: commands,
        })
            .then((data) => {
            console.log(`Successfully registered ${data.length} global application (/) commands`);
        })
            .catch((err) => {
            console.error("Error registering application (/) commands", err);
        });
    }
}
const app = new RealmRunner();
app.startBot();

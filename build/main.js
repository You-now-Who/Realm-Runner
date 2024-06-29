"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/main.ts
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DISCORD_ACCESS_TOKEN = process.env.BOT_TOKEN || "";
class RealmRunner {
    constructor() {
        this.client = new discord_js_1.Client({
            intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages, discord_js_1.GatewayIntentBits.MessageContent,],
        });
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
            if (content.includes("flutter")) {
                message.reply("Flutter SUCKS");
            }
            if (content.includes("python") || content.includes("Python")) {
                message.reply("Python is the best");
            }
            if (content.includes("Armaan") || content.includes("armaan")) {
                message.reply("Armaan chill out, dems the facts");
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
        })
            .catch((err) => {
            console.error("Error starting bot", err);
        });
    }
}
const app = new RealmRunner();
app.startBot();

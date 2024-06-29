"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/main.ts
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DISCORD_ACCESS_TOKEN = process.env.BOT_TOKEN || '';
class RealmRunner {
    constructor() {
        this.client = new discord_js_1.Client({
            intents: [
                discord_js_1.GatewayIntentBits.Guilds,
                discord_js_1.GatewayIntentBits.GuildMessages,
                discord_js_1.GatewayIntentBits.MessageContent,
            ],
        });
    }
    addClientEventHandlers() {
        this.client.on('ready', () => {
            console.log('Bot is ready');
        });
        // Add more event listeners as needed
    }
    startBot() {
        this.client
            .login(DISCORD_ACCESS_TOKEN)
            .then(() => {
            this.addClientEventHandlers();
        })
            .catch((err) => {
            console.error('Error starting bot', err);
        });
    }
}
const app = new RealmRunner();
app.startBot();

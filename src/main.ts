// src/main.ts
import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const DISCORD_ACCESS_TOKEN = process.env.BOT_TOKEN || '';

class RealmRunner {
  private client: Client;

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
  }

  private addClientEventHandlers() {
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
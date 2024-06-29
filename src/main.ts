// src/main.ts
import { Client, Events, Message, GatewayIntentBits } from 'discord.js';
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
      ],
    });
  }

  private addClientEventHandlers() {
    this.client.on(Events.MessageCreate, (message: Message) => {
      const { content } = message;
      message.reply(`Realm Runner Bot says: ${content}`);
    });

    this.client.on(Events.ClientReady, () => {
      console.log("Realm Runner bot client logged in");
    });

    this.client.on(Events.Error, (err: Error) => {
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
        console.error('Error starting bot', err);
      });
  }
  
}

const app = new RealmRunner();
app.startBot();
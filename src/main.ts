// src/main.ts
import { Client, Events, Message, GatewayIntentBits, ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const DISCORD_ACCESS_TOKEN = process.env.BOT_TOKEN || "";

class RealmRunner {
  private client: Client;

  constructor() {
    this.client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,],
    });
  }

  private addClientEventHandlers() {
    this.client.on(Events.MessageCreate, (message: Message) => {
      if (message.author.bot) {
        return;
      }
      const { content } = message;
      if (content === "ping") {
        message.reply("pong");
      }
      if (content.includes("flutter")){
        message.reply("Flutter SUCKS");
      }
      if (content.includes("python") || content.includes("Python")){
        message.reply("Python is the best");
      }
      if (content.includes("Armaan") || content.includes("armaan")){
        message.reply("Armaan chill out, dems the facts");
      }

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
        console.error("Error starting bot", err);
      });
  }
}

const app = new RealmRunner();
app.startBot();

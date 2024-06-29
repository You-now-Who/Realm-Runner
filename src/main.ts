// src/main.ts
import { Client, Events, Message, GatewayIntentBits, EmbedBuilder } from "discord.js";
import { firestore } from "./firebase/config";
import { collection, addDoc, setDoc } from "firebase/firestore";
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
      
    });

    this.client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        
        if (interaction.commandName === "ping") {
            await interaction.reply("Pong!");
        }
        else if (interaction.commandName === "d20") {
            const roll = Math.floor(Math.random() * 20) + 1;
            await interaction.reply("You rolled a " + roll + "!");
        }
        else if (interaction.commandName === "start") {
            const title = interaction.options.getString("title");
            const description = interaction.options.getString("description");
            const user = interaction.user;
            console.log("Starting new campaign", title, description, user);
            
            const docRef = await addDoc(collection(firestore, "campaigns"), {
                title: title,
                description: description,
                user: user.id,
            });

            console.log("Document written with ID: ", docRef.id);

            const embed = new EmbedBuilder()
                .setTitle(title)
                .setDescription(description)
                .setColor(0x00ff00);
            
            await interaction.reply({ embeds: [embed] });
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

// src/main.ts
import {
  Client,
  Events,
  Message,
  GatewayIntentBits,
  EmbedBuilder,
  ActivityType,
} from "discord.js";
import { firestore } from "./_firebase/config";
import {
  collection,
  addDoc,
  setDoc,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import eventHandler from "./handlers/eventHandler";
import dotenv from "dotenv";

dotenv.config();

const DISCORD_ACCESS_TOKEN = process.env.BOT_TOKEN || "";

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
    // this.client.on(Events.MessageCreate, (message: Message) => {
    //   if (message.author.bot) {
    //     return;
    //   }
    // });

    // this.client.on(Events.InteractionCreate, async (interaction) => {
    //   if (!interaction.isChatInputCommand()) return;

    //   if (interaction.commandName === "ping") {
    //     await interaction.reply("Pong!");
    //   } else if (interaction.commandName === "d20") {
    //     const roll = Math.floor(Math.random() * 20) + 1;
    //     await interaction.reply("You rolled a " + roll + "!");
    //   } else if (interaction.commandName === "start") {
    //     const description = interaction.options.getString("description");
    //     const name = interaction.options.getString("name");
    //     const user = interaction.user;
    //     console.log("Starting new campaign for ", name);

    //     const userRef = collection(firestore, "users");
    //     const userQuery = query(userRef, where("id", "==", user.id));
    //     const userSnapshot = await getDocs(userQuery);

    //     if (userSnapshot.empty) {
    //       const docRef = await addDoc(userRef, {
    //         id: user.id,
    //         username: user.username,
    //       });
    //       console.log("New user created with ID: ", docRef.id);
    //       const embed = new EmbedBuilder()
    //         .setTitle("Welcome, " + name + "!")
    //         .setDescription(description)
    //         .setColor(0x00ff00);

    //       await interaction.reply({ embeds: [embed] });
    //     } else {
    //       console.log("User already exists");
    //       await interaction.reply(
    //         "You are already registered. Try using joining or continuining your campaign."
    //       );
    //     }
    //   }

    //   else if (interaction.commandName === "campaign") {
    //     console.log("Viewing all campaigns");
    //   }
    // });

    // this.client.on(Events.ClientReady, () => {
    //   console.log("Realm Runner bot client logged in");

    //   this.client.user?.setActivity("Realm Runner", {
    //     type: ActivityType.Streaming,
    //     url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    //   });
    // });

    // this.client.on(Events.Error, (err: Error) => {
    //   console.error("Client error", err);
    // });

    eventHandler(this.client);
    
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

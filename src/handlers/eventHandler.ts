import path from "path";
import getAllFiles from "../utils/getAllFiles";

export default (client) => {
    const eventFolders = getAllFiles(path.join(__dirname, "../events"), true);

    for (const eventFolder of eventFolders) {
        const eventFiles = getAllFiles(eventFolder);
        eventFiles.sort((a, b) => a.localeCompare(b));
        console.log(eventFiles);

        const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();
        console.log(`Loading ${eventName} events...`);

        client.on(eventName, async (...args) => {
            for (const eventFile of eventFiles) {
                const eventFunction = await import(eventFile);
                await eventFunction.default(client, ...args);
            }
        });
    }
};
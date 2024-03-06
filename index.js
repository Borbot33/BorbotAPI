import { config } from 'dotenv'; config();
import express from "express";
import { readdirSync } from "fs";

if(!process.env.domain) {
  console.log("You dork! You need to set your domain :3")
  process.exit()
}
if(!process.env.discordBotToken) {
  console.log("You dork! You need to set the discord bot token :3")
  process.exit()
}

const app = express();

readdirSync("./Routes").forEach(file => {
    import(`./Routes/${file}`).then(module => {
        app.get(module.default.url, (req, res) => module.default.execute(req, res))
    })
})

app.listen(3750, () => {
  console.log(`[server]: It works. URL: https://localhost:3750`);
});
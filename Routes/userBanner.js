import { config } from 'dotenv'; config();
import path from "path";
import axios from "axios";
import Canvas from "@napi-rs/canvas";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

Canvas.GlobalFonts.registerFromPath(path.join(__dirname, '..', 'Fonts', 'NotoSans.ttf'), 'NotoSans')

const badges = {
    8388608: "supportscommands",
    16777216: "automod",
    4: "hypesquadevents",
    128: "hypesquadbrilliance",
    64: "hypesquadbravery",
    256: "hypesquadbalance",
    1: "discordstaff",
    2: "discordpartner",
    262144: "discordmod",
    131072: "discordbotdev",
    4194304: "activedeveloper",
    512: "discordearlysupporter",
    8: "discordbughunter1",
    16384: "discordbughunter2"
}

export default {
    url: "/api/userBanner/:userID",
    execute: async (req, res) => {
        if(!isNaN(req.params.userID)) {
            try {
                const response = await axios.get(`https://discord.com/api/v9/users/${req.params.userID}`, {
                    headers: {
                        'Authorization': `Bot ${process.env.discordBotToken}`
                    }
                });
                if(response.status == 200) {
                    const user = response.data; const avatarIndex = user.discriminator === '0' ? getUserAvatar(user.id) : user.discriminator % 5;
                    const avatarURL = user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=4096` : `https://cdn.discordapp.com/embed/avatars/${avatarIndex}.png?size=4096`;
                    
                    const canvas = Canvas.createCanvas(755, 450);
                    const context = canvas.getContext('2d');
                    
                    const avatar = await Canvas.loadImage(avatarURL);

                    if(user.banner) {
                        const banner = await Canvas.loadImage(`https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png?size=1024`);
                        context.drawImage(banner, 0, 0, 755, 250);
                    } else {
                        context.fillStyle = user.banner_color;
                        context.fillRect(0, 0, 755, 250);
                    }

                    context.fillStyle = '#222327';
                    context.fillRect(0, canvas.height-200, 1250, 200);

                    context.save();

                    const x = 75; const y = 125; const width = 200;
                    
                    context.beginPath();
                    context.arc(x + width / 2, y + width / 2, width / 2, 0, 2 * Math.PI);
                    context.closePath();
                    context.fillStyle = '#222327'; 
                    context.fill();
                    
                    context.save();
                    context.lineWidth = 40;
                    context.strokeStyle = '#222327';
                    context.stroke();
                    context.restore();
                    
                    context.clip();
                    context.drawImage(avatar, x, y, width, width);
                    context.restore();

                    context.font = "50px NotoSans";
                    context.fillStyle = "white";
                    context.fillText(user.global_name || user.username, 75, 382); 

                    context.font = "20px NotoSans";
                    context.fillStyle = "white";
                    context.fillText(`${user.username}${user.discriminator == '0' ? "" : `#${user.discriminator}`}`, 75, 403); 

                    let newWidth = 695;
                    if(user.premium_type) {
                        const badgeImage = await Canvas.loadImage(`./Badges/discordnitro.svg`);
                        context.drawImage(badgeImage, newWidth, 263, 45, 45); newWidth -= 50;
                    }
                    for(let [bit, badge] of Object.entries(badges)) {
                        if(user.flags & bit) {
                            const badgeImage = await Canvas.loadImage(`./Badges/${badge}.svg`);
                            context.drawImage(badgeImage, newWidth, 263, 45, 45); newWidth-=50
                        }
                    }

                    const buffer = await canvas.encode('png');

                    res.set('Content-Type', 'image/png');
                    res.send(buffer);
                } else {
                    await res.send({error: "You have entered the wrong user ID"})
                }
            } catch (e) {
                console.error(e)
                await res.send({error: "You have entered the wrong user ID"})
            }
        } else {
            await res.send({error: "You have entered the wrong user ID"})
        }
    }
}

function getUserAvatar(userId) {
    return Number(BigInt(userId) >> 22n) % 6;
}
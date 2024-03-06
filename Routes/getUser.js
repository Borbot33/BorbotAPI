import axios from "axios";
import { config } from 'dotenv'; config();

export default {
    url: "/:userID",
    execute: async (req, res) => {
        if(!isNaN(req.params.userID)) {
            try {
                const response = await axios.get(`https://discord.com/api/v9/users/${req.params.userID}`, {
                    headers: {
                        'Authorization': `Bot ${process.env.discordBotToken}`
                    }
                });
    
                if(response.status == 200) {
                    const user = response.data; const avatarNumber = user.discriminator === '0' ? getUserAvatar(user.id) : user.discriminator % 5;
                    res.send(`
                        <meta content="${response.data.username}${response.data.discriminator == '0' ? "" : `#${response.data.discriminator}`}" property="og:title" />
                        <meta content="AvatarHASH: ${user.avatar || "None"}\nAvatarNumber: ${avatarNumber}" property="og:description" />
                        <meta content="${process.env.domain}/api/userBanner/${req.params.userID}" property="og:image" />
                        <meta content="#43B581" data-react-helmet="true" name="theme-color" />
                        <meta name="twitter:card" content="summary_large_image">                    
                    `)
                } else {
                    await res.send({error: "You have entered the wrong user ID"})
                }
            } catch (e) {
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

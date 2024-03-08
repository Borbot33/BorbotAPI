import axios from "axios";
import unbApi from "unb-api";
import { config } from 'dotenv'; config();

export default {
    url: "/g/:guild",
    execute: async (req, res) => {
        let guild = null;
        try {
            if(isNaN(req.params.guild)) {
                const response = await axios.get(`https://discord.com/api/v10/invites/${req.params.guild}?with_counts=true&with_expiration=true`); const data = response.data;
                guild = {
                    name: data.guild.name,
                    id: data.guild_id,
                    memberCount: data.approximate_member_count,
                    icon: data.guild.icon ?? null
                }
            } else {
                if(process.env.unbToken) {
                    const unb = new unbApi.Client(process.env.unbToken);
                    const data = await unb.getGuild(req.params.guild);
                    if(data) {
                        guild = {
                            name: data.name,
                            id: data.id,
                            memberCount: data.memberCount,
                            icon: data.icon ?? null
                        }
                    }    
                } else {
                    return res.send({type: "Error", response: "We can't get data from this server. (UNB Problem)"})
                }
            }

            if(guild) {
                return res.send(`
                    <link type="application/json+oembed" href="${process.env.domain}/emb/${guild.id}.json" />
                    <meta content="${guild.name}" property="og:title" />
                    <meta content="Members: ${guild.memberCount}${guild.icon ? `\nGuildIcon: ${guild.icon}` : ""}" property="og:description" />
                    <meta content="#43B581" data-react-helmet="true" name="theme-color" />   
                `)
            } else {
                return res.send({type: "Error", response: "We can't get data from this server."})
            }
        } catch (e) {
            console.error(e)
            res.send({type: "Error", response: "We can't get data from this server."})
        }
    }
}
import axios from "axios";
import unbApi from "unb-api";
import { config } from 'dotenv'; config();

export default {
    url: "/g/:guild",
    execute: async (req, res) => {
        try {
            if(isNaN(req.params.guild)) {
                const response = await axios.get(`https://discord.com/api/v10/invites/${req.params.guild}?with_counts=true&with_expiration=true`); const data = response.data;
                res.send(`
                    <meta content="${data.guild.name}" property="og:title" />
                    <meta content="GuildID: ${data.guild_id}\nOnline Members: ${data.approximate_presence_count}${data.guild.icon ? `\nGuildIcon: ${data.guild.icon}` : ""}" property="og:description" />
                    <meta content="#43B581" data-react-helmet="true" name="theme-color" />  
                    <meta http-equiv="Refresh" content="0; url='https://www.youtube.com/watch?v=HLj_VKhqGPw'" />               
                `)
            } else {
                if(process.env.unbToken) {
                    const unb = new unbApi.Client(process.env.unbToken);
                    const data = await unb.getGuild(req.params.guild);
                    if(data) {
                        res.send(`
                            <meta content="${data.name}" property="og:title" />
                            <meta content="GuildID: ${data.id}\nOnline Members: ${data.memberCount}${data.icon ? `\nGuildIcon: ${data.icon}` : ""}" property="og:description" />
                            <meta content="#43B581" data-react-helmet="true" name="theme-color" />    
                            <meta http-equiv="Refresh" content="0; url='https://www.youtube.com/watch?v=HLj_VKhqGPw'" />             
                        `)
                    } else {
                        res.send({type: "Error", response: "We can't get data from this server."})
                    }
                } else {
                    res.send({type: "Error", response: "We can't get data from this server. (UNB Problem)"})
                }
            }
        } catch (e) {
            console.error(e)
            res.send({type: "Error", response: "We can't get data from this server."})
        }
    }
}
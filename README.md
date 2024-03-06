# BORBOT API

API for YAGPDB made in Express.JS by **Borbot33**

# Docker Compose Example (Recomended)

```yml
version: "3.9"
services:
    app:
        container_name: borbotapi
        image: borbot/borbotapi:latest
        restart: always
        ports:
            - "3750:3750"
        environment:
          domain: https://api.borbot.xyz/ #change it to your domain (for example: https://borbot.xyz/, http://localhost:3750/) / Required
          unbToken: if.you.read.this.ur.cute #change this to your from this page https://unbelievaboat.com/applications / Optional, but recomended (It's for the data from guild id)
          discordBotToken: owo #your discord bot token from the https://discord.com/developers/applications / Required
```

# Thanks for

- [BlackWolf](https://github.com/BlackWolfWoof) - idk why xd

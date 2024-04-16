# BORBOT API

API for YAGPDB made in Express.JS by **Borbot33**

# How to run the API

### Docker Compose

**Requirements:**
- Docker
- you need to be cute

**Instructions:**
1. Rename the file `example.env` to `.env`
2. Configure the file `.env`.
3. Edit the file `docker-compose.yml` **(Optional)**
4. Use the `docker compose` command
   
    ```bash
    sudo docker compose up -d
    ```

### Node.JS

**Requirements:**
1. Node.js v20 - [Linux](https://github.com/nodesource/distributions), [Windows & Mac](https://nodejs.org/)

**Instructions:**
1. Rename the file `example.env` to `.env`
2. Configure the file `.env`
3. Use this command to install libraries
   
    ```bash
        npm i
    ```
4. Run the api:
   
    ```
        node .
    ```
5. Now publish the api and play around :3

# TODO

- Discord webhook support for yag (It was in my old api)
- UNB API support (Optional / You can enable it in env file)
   
# Thanks to

- [BlackWolf](https://github.com/BlackWolfWoof) - idk why xd

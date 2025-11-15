# BORBOT API
Random API for YAGPDB made using `express.js`.

# How to run the API
There are two official ways, using docker or just with the `node .` command. Below you can find instructions for both ways.

## Docker Compose
**Requirements:**
- Docker

**Instructions:**
1. Rename the file `example.env` to `.env`
2. Edit the `.env` file.
3. Edit the `docker-compose.yml` file **(Optional)**
4. Run the `docker compose` command
    ```bash
    sudo docker compose up -d
    ```

## Node.JS
**Requirements:**
1. Node.js v20 - [Linux](https://github.com/nodesource/distributions), [Windows & Mac](https://nodejs.org/)

**Instructions:**
1. Rename the file `example.env` to `.env`
2. Edit the file `.env`
3. Run this command to install all required libraries
    ```bash
        npm i
    ```
4. Run the api:
    ```
        node .
    ```

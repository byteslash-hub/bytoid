# 🤖 Bytoid

Bytoid is an official bot of the [ByteSlash](discord.gg/djbpjqztej) discord community!

## 🔧 Made using

Bytoid is made using the following tech-stack

- [DiscordJS](https://discord.js.org)
- [MongoDB](https://mongodb.com/)

## ⚙ Developer guide

To test the bot locally follow the following steps:

1. Fork this repository
2. Clone this repository into your local machine by using the following command

   ```bash
   git clone https://github.com/<your-username>/bytoid
   ```

3. Installing the dependencies

   ```bash
   npm install
   ```

4. Creating a bot account on [discord dev portal](https://discord.com/developers/)

   - Login via using your discord account
   - Click on the `New application` button

     ![](https://imgur.com/DXtvISp.png)

   - Give name to your application

     ![](https://imgur.com/REtoYHu.png)

   - Navigate to the `Bot` section from the left sidebar

     ![](https://imgur.com/3fkYEyG.png)

   - Make your application into a discord bot by clicking the `Add Bot` button

     ![](https://imgur.com/28yB2qO.png)

   - Copy the token of your discord bot [Don't share the token with anyone]

     ![](https://imgur.com/HsdXLsW.png)

5. Creating a MongoDB database

   - Head over to [MongoDB](https://www.mongodb.com/) and create/sign in into your account
   - Create a new project and give your project name

     ![](https://imgur.com/EjPgAZe.png)

   - After the project is been completed, click on `Build a database`. Select the shared plan and move forward

   ![](https://imgur.com/G5L66Sd.png)

   - Copy the connection url

6. Rename `.env.example` to `.env` and place the environment variables in their place as mentioned in the file
7. Run `npm run dev` command to bring the bot online

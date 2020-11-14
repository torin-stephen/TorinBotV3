# Hangcord
Make your create hangman game on Discord easy

# Installation
```sh
npm install hangcord
```

# Features
- Super easy to use 😀
- More than 100 word ✅

# Examples
```js
const Discord = require('discord.js'); // Require discord.js
const HangmanGame = require('hangcord'); // Require HangmanGame
const client = new Discord.Client(); // Create client

const hangman = new HangmanGame({
  title: 'Hangman', // Title of the embed while displaying the game. Default: Hangman
  color: 'RANDOM', // Color of the embed. Default: RANDOM
  timestamp: true, // Will set timestamp for embeds. Default: true
  gameOverTitle: 'Game Over', // Will set the embed title of the game over embed. Default: 'Game Over'
  words: ['word1', 'word2'] // Custom set of words. Deafult: './words.json'
});

// or
const hangman = new HangmanGame()
  .setTitle('Hangman') // Will set embed title
  .setColor('RANDOM') // Will set embed color
  .setTimestamp() // Will set timestamp for your embed!
  .setGameOverTitle('Game Over') // Will set the embed title of the game over embed!
  .setWords(['word1', 'word2']) // Will set words
  .pushWords(['word3', 'word4']) // Will push words to the existing list!

// Config

client.config = {
    token: "TOKEN"
}

// Ready Event

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Message Event

client.on('message', msg => {
    if (msg.content.toLowerCase() === '!test') {
        msg.reply("Test command work!")
    }

    else if (msg.content.toLowerCase() === '!hangman') {
        hangman.newGame(msg);
    }
})
 
// Login the bot
client.login(client.config.token)
```

## Picture
![hangman-1](/images/hangman-1.png)

![hangman-2](/images/hangman-2.png)

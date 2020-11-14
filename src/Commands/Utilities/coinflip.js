const Command = require('../../Structures/Command');

module.exports = class extends Command {

      constructor(...args) {
            super(...args, {
                  name: 'coinflip',
			aliases: ['cf'],
			description: 'Flip a coin',
			category: 'Utilities',
			usage: '$coinflip'
            });
      }

      async run(message) {
            {
                  function doRandHT() {
                        var rand = ['HEADS!', 'TAILS!'];

                        return rand[Math.floor(Math.random() * rand.length)];
                  }

                  const embed = {
                        "title": `Here is the winner!`,
                        "description": doRandHT(),
                        "color": 7584788,
                  };
                  message.channel.send({ embed });


            };
      }

};

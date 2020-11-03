const db = require('mongoose');

const guildSchema = db.Schema({
    guildId: {
        type: String,
        required: true
    }, prefix: {
        type: String,
    },
});

module.exports = db.model('guild-settings', guildSchema)
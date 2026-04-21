const { EmbedBuilder } = require('discord.js');

function successEmbed(title, description) {
  return new EmbedBuilder()
    .setColor(0x2ecc71)
    .setTitle(`✅ ${title}`)
    .setDescription(description)
    .setTimestamp();
}

function errorEmbed(description) {
  return new EmbedBuilder()
    .setColor(0xe74c3c)
    .setTitle('❌ Error')
    .setDescription(description)
    .setTimestamp();
}

function infoEmbed(title, description) {
  return new EmbedBuilder()
    .setColor(0x3498db)
    .setTitle(`ℹ️ ${title}`)
    .setDescription(description)
    .setTimestamp();
}

module.exports = { successEmbed, errorEmbed, infoEmbed };

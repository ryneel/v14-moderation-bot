const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { successEmbed, errorEmbed } = require('../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Delete multiple messages at once.')
    .addIntegerOption(opt =>
      opt.setName('amount').setDescription('Number of messages to delete (1-100)').setRequired(true).setMinValue(1).setMaxValue(100))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');

    try {
      await interaction.channel.bulkDelete(amount, true);
      const reply = await interaction.reply({
        embeds: [successEmbed('Messages Purged', `Successfully deleted **${amount}** message(s).`)],
        fetchReply: true,
      });
      setTimeout(() => reply.delete().catch(() => {}), 4000);
    } catch {
      await interaction.reply({ embeds: [errorEmbed('Failed to delete messages. Messages older than 14 days cannot be deleted.')], ephemeral: true });
    }
  },
};

const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { successEmbed, errorEmbed } = require('../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Remove timeout from a member.')
    .addUserOption(opt =>
      opt.setName('target').setDescription('The member to unmute').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const target = interaction.options.getMember('target');

    if (!target) return interaction.reply({ embeds: [errorEmbed('Member not found.')], ephemeral: true });

    try {
      await target.timeout(null);
      await interaction.reply({
        embeds: [successEmbed('Member Unmuted', `**${target.user.tag}**'s timeout has been removed.`)],
      });
    } catch {
      await interaction.reply({ embeds: [errorEmbed('Failed to unmute the member.')], ephemeral: true });
    }
  },
};

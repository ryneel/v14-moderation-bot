const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { successEmbed, errorEmbed } = require('../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clearwarn')
    .setDescription('Clear all warnings of a member.')
    .addUserOption(opt =>
      opt.setName('target').setDescription('The member to clear warnings for').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction, client) {
    const target = interaction.options.getMember('target');

    if (!target) return interaction.reply({ embeds: [errorEmbed('Member not found.')], ephemeral: true });

    client.warnings.delete(target.user.id);

    await interaction.reply({
      embeds: [successEmbed('Warnings Cleared', `All warnings for **${target.user.tag}** have been cleared.`)],
    });
  },
};

const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { infoEmbed, errorEmbed } = require('../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warnings')
    .setDescription('View warnings of a member.')
    .addUserOption(opt =>
      opt.setName('target').setDescription('The member to check').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction, client) {
    const target = interaction.options.getMember('target');

    if (!target) return interaction.reply({ embeds: [errorEmbed('Member not found.')], ephemeral: true });

    const warns = client.warnings.get(target.user.id) ?? [];

    if (warns.length === 0) {
      return interaction.reply({ embeds: [infoEmbed('No Warnings', `**${target.user.tag}** has no warnings.`)] });
    }

    const list = warns.map((w, i) => `**${i + 1}.** ${w.reason} — <t:${Math.floor(new Date(w.date).getTime() / 1000)}:R>`).join('\n');

    await interaction.reply({
      embeds: [infoEmbed(`Warnings for ${target.user.tag}`, list)],
    });
  },
};

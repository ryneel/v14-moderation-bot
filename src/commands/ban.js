const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { successEmbed, errorEmbed } = require('../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a member from the server.')
    .addUserOption(opt =>
      opt.setName('target').setDescription('The member to ban').setRequired(true))
    .addStringOption(opt =>
      opt.setName('reason').setDescription('Reason for the ban').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const target = interaction.options.getMember('target');
    const reason = interaction.options.getString('reason') ?? 'No reason provided';

    if (!target) return interaction.reply({ embeds: [errorEmbed('Member not found.')], ephemeral: true });
    if (!target.bannable) return interaction.reply({ embeds: [errorEmbed('I cannot ban this member.')], ephemeral: true });

    try {
      await target.send(`🔨 You have been **banned** from **${interaction.guild.name}**.\n**Reason:** ${reason}`).catch(() => {});
      await target.ban({ reason });
      await interaction.reply({ embeds: [successEmbed('Member Banned', `**${target.user.tag}** has been banned.\n**Reason:** ${reason}`)] });
    } catch {
      await interaction.reply({ embeds: [errorEmbed('Failed to ban the member.')], ephemeral: true });
    }
  },
};

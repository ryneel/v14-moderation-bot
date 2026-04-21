const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { successEmbed, errorEmbed } = require('../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a member from the server.')
    .addUserOption(opt =>
      opt.setName('target').setDescription('The member to kick').setRequired(true))
    .addStringOption(opt =>
      opt.setName('reason').setDescription('Reason for the kick').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const target = interaction.options.getMember('target');
    const reason = interaction.options.getString('reason') ?? 'No reason provided';

    if (!target) return interaction.reply({ embeds: [errorEmbed('Member not found.')], ephemeral: true });
    if (!target.kickable) return interaction.reply({ embeds: [errorEmbed('I cannot kick this member.')], ephemeral: true });

    try {
      await target.send(`👢 You have been **kicked** from **${interaction.guild.name}**.\n**Reason:** ${reason}`).catch(() => {});
      await target.kick(reason);
      await interaction.reply({ embeds: [successEmbed('Member Kicked', `**${target.user.tag}** has been kicked.\n**Reason:** ${reason}`)] });
    } catch {
      await interaction.reply({ embeds: [errorEmbed('Failed to kick the member.')], ephemeral: true });
    }
  },
};

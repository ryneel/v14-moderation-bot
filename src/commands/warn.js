const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { successEmbed, errorEmbed } = require('../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a member.')
    .addUserOption(opt =>
      opt.setName('target').setDescription('The member to warn').setRequired(true))
    .addStringOption(opt =>
      opt.setName('reason').setDescription('Reason for the warning').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction, client) {
    const target = interaction.options.getMember('target');
    const reason = interaction.options.getString('reason');

    if (!target) return interaction.reply({ embeds: [errorEmbed('Member not found.')], ephemeral: true });

    const userId = target.user.id;
    if (!client.warnings.has(userId)) client.warnings.set(userId, []);
    client.warnings.get(userId).push({ reason, date: new Date().toISOString() });

    const total = client.warnings.get(userId).length;

    await target.send(`⚠️ You have been **warned** in **${interaction.guild.name}**.\n**Reason:** ${reason}\n**Total Warnings:** ${total}`).catch(() => {});
    await interaction.reply({
      embeds: [successEmbed('Member Warned', `**${target.user.tag}** has been warned.\n**Reason:** ${reason}\n**Total Warnings:** ${total}`)],
    });
  },
};

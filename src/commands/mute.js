const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { successEmbed, errorEmbed } = require('../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Timeout (mute) a member.')
    .addUserOption(opt =>
      opt.setName('target').setDescription('The member to mute').setRequired(true))
    .addIntegerOption(opt =>
      opt.setName('duration').setDescription('Duration in minutes').setRequired(true).setMinValue(1).setMaxValue(40320))
    .addStringOption(opt =>
      opt.setName('reason').setDescription('Reason for the mute').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const target = interaction.options.getMember('target');
    const duration = interaction.options.getInteger('duration');
    const reason = interaction.options.getString('reason') ?? 'No reason provided';

    if (!target) return interaction.reply({ embeds: [errorEmbed('Member not found.')], ephemeral: true });
    if (!target.moderatable) return interaction.reply({ embeds: [errorEmbed('I cannot mute this member.')], ephemeral: true });

    try {
      await target.timeout(duration * 60 * 1000, reason);
      await interaction.reply({
        embeds: [successEmbed('Member Muted', `**${target.user.tag}** has been muted for **${duration} minute(s)**.\n**Reason:** ${reason}`)],
      });
    } catch {
      await interaction.reply({ embeds: [errorEmbed('Failed to mute the member.')], ephemeral: true });
    }
  },
};

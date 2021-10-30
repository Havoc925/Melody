module.exports = {
	name: "leave",
	description: "Make bot leave channel",
	usage: "",
	args: {},
	category: "music",
	aliases: [], // type: Array
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	async execute(_client, message, _args, _Discord, _config, _ezcolor, _utils, _opusEncoder, voicePlayer, DJSVoice, _queueMap, _nowPlaying) {
		const connection = DJSVoice.getVoiceConnection(message.guild.id); // Get connection
		if(connection) {
			if (message.member.voice.channel) {
				if(message.member.voice.channel.id === connection.joinConfig.channelId) {
					connection.destroy();
					voicePlayer.stop();
				} else {
					message.channel.send("You must be in the same channel as the bot to use this command");
				}
			} else {
				message.channel.send("You must be in the same channel as the bot to use this command");
			}
		} else {
			message.channel.send("Bot is not connected to a voice channel");
		}
	}
};
/* eslint-disable */
const Package = require("../../../package.json");
const config = require("../../config/CONFIG.json");
const queueModel = require("../../models/queue.schema.js");
const guildModel = require("../../models/guild.schema.js");
const utils = require("djs-utils");

module.exports = {
	name: "ready",
	once: true,
	async execute(_Discord, client, colors) {
		var date = new Date;
		var command = (Array.from(client.commands)).length;
		var event = (Array.from(client.events)).length;
		console.log(
			"I am ready!\n \n",
			`Bot Name:        "${ Package["name"] }"\n`.green,
			`Bot Version:     "${ Package["version"] }"\n`.green,
			`Bot Description: "${ Package["description"] }"\n`.green,
			`Bot Author:      "${ Package["author"] }"\n`.green,
			`Bot environment: "${ utils.searchArgv("env", true) === "dev" ? "DEV" : "PROD" }"\n\n`.green,
			`Bot online! Current time: ${ (date).toLocaleTimeString() }\n\n`.green,
			`Loaded ${ command } commands!\n`.green,
			`Loaded ${ event } events!\n`.green);
		utils.log("Bot started");
		utils.setRichPresence(client, config);
		utils.pm2.init(client);
		
		
		if (utils.searchArgv("git")) {
			console.log("Process started successfully: Now exiting with code \"0\" ".bgGreen);
			process.exit(0);
		}//else {
			//try {
			//	QueueModel.collection.drop().then(console.log(" Dropped queue collection\n"));
			//} catch(err) {
			//	console.log("Could not drop queue collection");
			//	console.log(err);
			//}
		 //
		const guilds = client.guilds.cache.map(guild => guild);
		for( const guild of guilds) {
			let GuildData;
			try {
				GuildData = await guildModel.findOne({ guildID: guild.id });
				if (!GuildData) {
					utils.log(`No guild data found for: ${ guild.name }`);
					const guildSchema = await guildModel.create({
						guildID: guild.id,
						guildName: guild.name, 
						playing: false,
						loop: false,
						songsInQueue: 0,
						volume: 1
					});
					guildSchema.save().then(utils.log(`Guild data saved for: ${ guild.name }`));
				}
				try{
					await guildModel.findOneAndUpdate({ guildID: guild.id },
						{
							playing: false,
							loop: false,
							songsInQueue: 0
						});
				} catch (err) { utils.log(err); }
			} catch (err) { utils.log(err); }
		}

	}
};

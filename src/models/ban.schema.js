const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	userID:  { type: String, require: true, unique: true },
	guildID: { type: String, required: true },
	expires: { type: Date }
});

const model = mongoose.model("Bans", Schema);

module.exports = model;
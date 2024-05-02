const mongoose = require("mongoose");
const ChatSchema = new mongoose.Schema({
    sender:String,
    conv_identifier:String,
    platform_type:String,
    api_key:String,
    message:String,
});


module.exports = mongoose.model("Chat", ChatSchema);
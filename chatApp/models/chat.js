import mongoose from "mongoose";
const chatSchema = new mongoose.Schema({
  room: String,
  users: [String],
  messages: [
    {
      username: String,
      text: String,
      time: Date,
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;

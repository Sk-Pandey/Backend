const mongoose = require("mongoose");
const Chat = require("./models/chats");

main()
  .then(() => {
    console.log("Connection SucessFull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

const allChats = [
  {
    from: "neha",
    to: "Priya",
    message: "Hey, how are you Priya?",
    created_at: new Date("2026-10-20"),
  },
  {
    from: "Priya",
    to: "neha",
    message: "I'm good! How about you?",
    created_at: new Date("2026-10-19"),
  },
  {
    from: "Rahul",
    to: "Amit",
    message: "Hey bro, what's up?",
    created_at: new Date("2026-10-18"),
  },
  {
    from: "Amit",
    to: "Rahul",
    message: "Nothing much, just chilling.",
    created_at: new Date("2026-10-17"),
  },
  {
    from: "Sneha",
    to: "Priya",
    message: "Are you free this evening?",
    created_at: new Date("2026-10-16"),
  },
  {
    from: "Priya",
    to: "Sneha",
    message: "Yes, let's meet at 6 PM!",
    created_at: new Date("2026-10-15"),
  },
  {
    from: "neha",
    to: "Rahul",
    message: "Can you help me with something?",
    created_at: new Date("2026-10-14"),
  },
  {
    from: "Rahul",
    to: "neha",
    message: "Sure, tell me what you need.",
    created_at: new Date("2026-10-13"),
  },
  {
    from: "Amit",
    to: "Sneha",
    message: "Did you finish the assignment?",
    created_at: new Date("2026-10-12"),
  },
  {
    from: "Sneha",
    to: "Amit",
    message: "Yes, I finished it yesterday!",
    created_at: new Date("2026-10-11"),
  },
];

Chat.insertMany(allChats);

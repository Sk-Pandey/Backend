const mongoose = require("mongoose");

main()
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const Book = mongoose.model("Book", bookSchema);

// Data Insertion
/* 
Book.insertMany([
  {
    title: "Jeet Apki",
    author: "Shiv kheda",
    price: 499,
  },
  {
    title: "The Mind",
    author: "Swami Vivekanada",
    price: 649,
  },
  {
    title: "Atomic Habit",
    author: "James Clear",
    price: 329,
  },
]);
 */

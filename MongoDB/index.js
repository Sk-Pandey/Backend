const mongoose = require("mongoose");

main()
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  city: String,
  course: String,
  placementLpa: Number,
});

const User = mongoose.model("User", userSchema);

User.deleteOne({ name: "Tara Choudhary" })
  .then((res) => console.log(res))
  .catch((err) => {
    console.log(err);
  });

/* const user1 = new User({
  name: "Adam",
  email: "adm@gmail.com",
  age: 29,
});
const user2 = new User({
  name: "Lena",
  email: "Lena@gmail.com",
  age: 19,
});

user1.save();
user2
  .save()
  .then((res) => console.log(res))
  .catch((err) => {
    console.log(err);
  }); */

/* User.insertMany([
  {
    name: "Aarav Sharma",
    age: 21,
    city: "Delhi",
    course: "Full Stack Development",
    placementLpa: 8.5,
  },
  {
    name: "Ananya Verma",
    age: 22,
    city: "Mumbai",
    course: "Data Science",
    placementLpa: 12.0,
  },
  {
    name: "Vihaan Gupta",
    age: 21,
    city: "Delhi",
    course: "Java Development",
    placementLpa: 6.5,
  },
  {
    name: "Ishita Mishra",
    age: 23,
    city: "Pune",
    course: "Data Science",
    placementLpa: 10.0,
  },
  {
    name: "Aditya Rajput",
    age: 24,
    city: "Jaipur",
    course: "Full Stack Development",
    placementLpa: 9.0,
  },
  {
    name: "Saanvi Agarwal",
    age: 22,
    city: "Mumbai",
    course: "Java Development",
    placementLpa: 7.5,
  },
  {
    name: "Reyansh Singh",
    age: 25,
    city: "Lucknow",
    course: "Data Science",
    placementLpa: 14.0,
  },
  {
    name: "Kavya Tiwari",
    age: 21,
    city: "Delhi",
    course: "Full Stack Development",
    placementLpa: 5.5,
  },
  {
    name: "Arjun Malhotra",
    age: 23,
    city: "Pune",
    course: "Cloud Computing",
    placementLpa: 11.0,
  },
  {
    name: "Myra Saxena",
    age: 22,
    city: "Jaipur",
    course: "Data Science",
    placementLpa: 8.0,
  },
  {
    name: "Kabir Chawla",
    age: 24,
    city: "Mumbai",
    course: "Full Stack Development",
    placementLpa: 13.5,
  },
  {
    name: "Aadhya Pandey",
    age: 20,
    city: "Lucknow",
    course: "Java Development",
    placementLpa: 4.5,
  },
  {
    name: "Dhruv Saxena",
    age: 23,
    city: "Delhi",
    course: "Cloud Computing",
    placementLpa: 9.5,
  },
  {
    name: "Kiara Kapoor",
    age: 22,
    city: "Pune",
    course: "Full Stack Development",
    placementLpa: 7.0,
  },
  {
    name: "Rudransh Yadav",
    age: 26,
    city: "Jaipur",
    course: "Data Science",
    placementLpa: 16.0,
  },
  {
    name: "Pari Srivastava",
    age: 21,
    city: "Lucknow",
    course: "Cloud Computing",
    placementLpa: 6.0,
  },
  {
    name: "Atharv Bansal",
    age: 24,
    city: "Mumbai",
    course: "Java Development",
    placementLpa: 10.5,
  },
  {
    name: "Navya Joshi",
    age: 23,
    city: "Pune",
    course: "Data Science",
    placementLpa: 12.5,
  },
  {
    name: "Krish Mehta",
    age: 22,
    city: "Delhi",
    course: "Java Development",
    placementLpa: 8.0,
  },
  {
    name: "Tara Choudhary",
    age: 25,
    city: "Lucknow",
    course: "Full Stack Development",
    placementLpa: 11.5,
  },
]); */
/* User.find({ age: { $gt: 30 } }) // we can use find one and findById also
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
 */

// User.updateOne
/* User.updateMany({ age: 19 }, { age: 20 })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
 */

/* User.findOneAndUpdate({ name: "Ritu" }, { name: "Ritu Pandey" }, { new: true })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
 */

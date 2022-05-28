/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose");
const _ = require("lodash");
const Courses = require("./src/models/courses.model");
const Users = require("./src/models/user.model");
const config = require("./src/config/config");

const courses = [];
const usersId = [];
const enrolledStudents = [];

const users = [
  {
    firstName: "Mak",
    lastName: "Ovcina",
    email: "mak.ovcina@test.com",
    password: "12345678",
    role: "mentor",
  },
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@test.com",
    password: "12345678",
    role: "student",
  },
  {
    firstName: "John",
    lastName: "Smith",
    email: "hugo_tutto_cammara@test.com",
    password: "12345678",
    role: "mentor",
  },
  {
    firstName: "Larry",
    lastName: "Bird",
    email: "harry.lattam@test.com",
    password: "12345678",
    role: "student",
  },
  {
    firstName: "paragon",
    lastName: "paragon",
    email: "paragon@paragon.ba",
    password: "Paragon202!",
    role: "admin",
    active: true,
  },

  {
    firstName: "Luka",
    lastName: "Ovcina",
    email: "luka.ovcina@test.com",
    password: "12345678",
    role: "mentor",
  },
  {
    firstName: "Marina",
    lastName: "Ovcina",
    email: "luka.ovcina@test.com",
    password: "12345678",
    role: "mentor",
  },
  {
    firstName: "Adnan",
    lastName: "Ovcina",
    email: "adnan.ovcina@test.com",
    password: "12345678",
    role: "mentor",
  },
];

const levels = ["Beginner Level", "Intermediate Level", "Advanced Level"];
const duration = [
  "0 - 3 Hours",
  "3 - 6 Hours",
  "6 - 12 Hours",
  "1 - 2 Days",
  "2 - 5 Days",
  "5 - 15 Days",
];

mongoose
  .connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected..."))
  .catch((e) => console.log(e));

const createUsers = async () => {
  await Users.insertMany(users);
  const user = await Users.where({ role: "mentor" }).exec();

  for (let i = 0; i < 101; i++) {
    courses.push({
      mentorId: user[Math.floor(Math.random() * user.length)]._id,
      title:
        i === 0
          ? `Aed gravida velit vitae ${i}`
          : i === 1
          ? `Bed gravida velit vitae ${i}`
          : i === 2
          ? `Ced gravida velit vitae ${i}`
          : i === 3
          ? `Ded gravida velit vitae ${i}`
          : `Sed gravida velit vitae ${i}`,
      level: levels[Math.floor(Math.random() * levels.length)],
      courseImage: `/images/image${i + 1}.jpg`,
      duration: duration[Math.floor(Math.random() * duration.length)],
      description:
        "Sed gravida velit vitae condimentum posuere. Donec libero mauris, tempor ac luctus ut.",
      status: "active",
    });
  }
  await Courses.insertMany(courses);
};

createUsers()
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
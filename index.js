const express = require("express");
const Sequelize = require("sequelize");
const AuthorModel = require("./src/models/Author");
const TweetModel = require("./src/models/Tweet");
const uuidv4 = require("uuid/v4");
const tryCatchWrapper = require("./src/helper/tryCatchWrapper");

const sequelize = new Sequelize("twitter_example", "postgres", "12345678", {
  host: "localhost",
  dialect: "postgres"
});

const app = express();
// Need a body parser
app.use(express.json());

const Tweet = TweetModel(sequelize, Sequelize);
const Author = AuthorModel(sequelize, Sequelize);

Tweet.belongsTo(Author);
Author.hasMany(Tweet);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Your server is running");
  });
});

app.post(
  "/authors",
  tryCatchWrapper(async (req, res, next) => {
    const bodyWithUniqueId = { ...req.body, id: uuidv4() };
    const author = await Author.create(bodyWithUniqueId);
    res.status(201).json({ message: "Sucessfully created author", author });
  })
);

app.get("/authors", async (req, res, next) => {
  const authors = await Author.findAll({ include: [Tweet] });
  res.status(200).json(authors);
});

app.post("/tweets", async (req, res, next) => {
  try {
    console.log(req.body);
    const tweet = await Tweet.create(req.body);
    res.status(201).json({ message: "Sucessfully created tweet", tweet });
  } catch (error) {
    res.status(400).json({
      message: "bad request",
      error: error
    });
  }
});

app.get("/tweets", async (req, res, next) => {
  try {
    const tweets = await Tweet.findAll({ include: [Author] });
    res.status(200).json(tweets);
  } catch (error) {
    res.status(400).json(error);
  }
});

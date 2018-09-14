const express = require("express");
const Sequelize = require("sequelize");
const AuthorModel = require("./src/models/Author");
const TweetModel = require("./src/models/Tweet");

const sequelize = new Sequelize("twitter_example", "postgres", "12345678", {
  host: "localhost",
  dialect: "postgres"
});

const app = express();
// Need a body parser
app.use(express.json()) 


const Tweet = TweetModel(sequelize, Sequelize);
const Author = AuthorModel(sequelize, Sequelize);

Tweet.belongsTo(Author);
Author.hasMany(Tweet);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Your server is running");
  });
});

app.post("/authors", async (req, res, next) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).json({ message: "Sucessfully created author", author });
    } catch (error) {
        res.status(400).json({message: "bad request",
    error: error.errors})
    }
});

app.get("/authors", async (req, res, next) => {
  const authors = await Author.findAll();
  res.status(200).json(authors);
});

app.post("/tweets", async (req, res, next) => {
    try {
        const tweet = await Tweet.create(req.body);
        res.status(201).json({ message: "Sucessfully created tweet", tweet });
    } catch (error) {
        res.status(400).json({message: "bad request",
    error: error.errors})
    }
});

app.get("/tweets", async (req, res, next) => {
    const tweets = await Tweet.findAll();
    res.status(200).json(tweets);
  });



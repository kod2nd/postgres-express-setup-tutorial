const TweetModel = (sequelize, DataTypes) => {
  const Tweet = sequelize.define("tweet", {
    text: {
      type: DataTypes.STRING,
      required: true
    }
  });
  return Tweet;
};

module.exports = TweetModel;

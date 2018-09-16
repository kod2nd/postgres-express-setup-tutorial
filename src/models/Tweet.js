const TweetModel = (sequelize, DataTypes) => {
  const Tweet = sequelize.define("tweet", {
    text: {
      type: DataTypes.STRING,
    }
  });
  return Tweet;
};

module.exports = TweetModel;

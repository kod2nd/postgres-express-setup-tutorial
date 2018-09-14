const AuthorModel = (sequelize, DataTypes) => {
  const Author = sequelize.define("author", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      required: true
    }
  });
  return Author;
};

module.exports = AuthorModel;

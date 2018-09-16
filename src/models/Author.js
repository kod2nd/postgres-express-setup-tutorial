const AuthorModel = (sequelize, DataTypes) => {
  const Author = sequelize.define("author", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull:false
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      required: true
    }
  });
  return Author;
};

module.exports = AuthorModel;

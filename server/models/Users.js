// Users Table 
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      //columns
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'username already in use!'
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
    return Users;
  };
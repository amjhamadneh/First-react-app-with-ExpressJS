
// Posts Table
module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        //columns of table 
        text: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    return Posts
}
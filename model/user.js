const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/1.db'
})
//用户表
const userModel = sequelize.define('User', {
  // 在这里定义模型属性
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  password: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
  // 这是其他模型参数
});

//用户信息表
const userInfoModel = sequelize.define('UserInfo', {
  // 在这里定义模型属性
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  birthday: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: false
  // 这是其他模型参数
});

// 定义关系
// 1----1   一对一关系
userModel.hasOne(userInfoModel, { foreignKey: 'user_id', sourceKey: 'id' })
userInfoModel.belongsTo(userModel, { foreignKey: 'user_id', targetKey: 'id' })


sequelize.sync();


module.exports = { userModel, userInfoModel }
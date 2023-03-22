const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const UserMeta = sequelize.define('user_meta', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
})

const ListComments = sequelize.define('list_comments', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Comments = sequelize.define('comments', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.STRING, allowNull: false},
    likes: {type: DataTypes.INTEGER, allowNull: false},
})

const Film = sequelize.define('film', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nameRu: {type: DataTypes.STRING},
    nameEn: {type: DataTypes.STRING},
    nameOriginal: {type: DataTypes.STRING, allowNull: false},
    posterUrlPreview: {type: DataTypes.STRING, allowNull: false},
    descriptions: {type: DataTypes.STRING, allowNull: false},
    ratingKinopoisk: {type: DataTypes.STRING, allowNull: false},
    year: {type: DataTypes.INTEGER, allowNull: false},
    ratingAgeLimits: {type: DataTypes.INTEGER},
    filmLength: {type: DataTypes.INTEGER, allowNull: false},
})
const Genres = sequelize.define('genres', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    genre: {type: DataTypes.STRING, allowNull: false},
})
const Countries = sequelize.define('countries', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    country: {type: DataTypes.STRING, allowNull: false},
})
const Staff = sequelize.define('staff', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nameRu:  {type: DataTypes.STRING, allowNull: false},
    nameEn:  {type: DataTypes.STRING, allowNull: false},
    description:  {type: DataTypes.STRING, allowNull: false},
    posterUrl:  {type: DataTypes.STRING, allowNull: false},
    professionText: {type: DataTypes.STRING, allowNull: false},
    professionKey:  {type: DataTypes.STRING, allowNull: false},
})

const Budget = sequelize.define('budget', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.STRING, allowNull: false},
    amount: {type: DataTypes.STRING, allowNull: false},
    symbol: {type: DataTypes.STRING, allowNull: false},
})


User.hasOne(UserMeta)
UserMeta.belongsTo(User)

User.hasOne(ListComments)
ListComments.belongsTo(User)

ListComments.hasMany(Comments)
Comments.belongsTo(ListComments)

Film.hasMany(Genres, {as: 'genre'})
Genres.belongsTo(Film)

Film.hasMany(Countries, {as: 'country'})
Countries.belongsTo(Film)

Film.hasOne(Budget)
Budget.belongsTo(Film)

Film.hasMany(Staff)
Staff.belongsTo(Film)

module.exports = {
    User, UserMeta, Film, ListComments, Comments, Countries, Budget, Genres, Staff
}
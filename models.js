const mongoose = require('mongoose')
const User = mongoose.model('User', {
  login: String,
  password: String,
})

const Restaurant = mongoose.model('Restaurant', {
  name: String, cuisine: String, location: String, rating: String, reviews: Array, check: String
})

module.exports = { User, Restaurant }

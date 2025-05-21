const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  //avatarUrl: String,
  passwordHash: String, 
  roles: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema); //Compile the Schema into a Model.

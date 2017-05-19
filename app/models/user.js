const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
  local : {
    email : String,
    password : String,
  },
  facebook : {
    id : String,
    token : String,
    email : String,
    name : String
  },
  twitter : {
    id : String,
    token : String,
    displayName : String,
    username : String
  },
  google : {
    id : String,
    token : String,
    email : String,
    name : String
  },
});

// generating a Hash
userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// check if password is valid
userSchema.methods.validPassword = (password) => {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and show it TO THE WORLD MOTHERFUCKERS
module.exports = mongoose.model('User', userSchema);

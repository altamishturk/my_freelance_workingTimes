const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true,'firstname is required'],
    maxLen: 50,
  },
  lastname: {
    type: String,
    maxLen: 100
  },
  email: {
    type: String,
    required: [true,'email is required'],
    unique: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  },
  passwordhash: String
},{timestamps: true});



UserSchema.virtual('password')
.set(function(value){
  this._password = value;
})
.get(function(){
  return this._password
})



UserSchema.methods.hashIt = async function(password){
  const salt = await bcrypt.genSalt(6);
  this.passwordhash = await bcrypt.hash(password, salt);
}




module.exports = mongoose.model('user', UserSchema);
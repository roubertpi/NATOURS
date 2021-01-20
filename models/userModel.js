const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

//name, email, photo, password, passwordConfirm

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    maxlength: [40, 'O nome não pode ser maior que 40 caracteres'],
    minlength: [10, 'O Nome não pode ser menor que 10 caracteres'],
  },

  email: {
    type: String,
    required: [true, 'O Email é necessario'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Um email valido'],
  },

  photo: String,

  password: {
    type: String,
    required: [true, 'Digite sua Senha'],
    minlength: [8, 'Senha de do minimo 8 Caractere'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confirme sua senha'],
    minlength: [8, 'Senha de do minimo 8 Caractere'],
    validate: {
      // this only work on  CREATE and Save !!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

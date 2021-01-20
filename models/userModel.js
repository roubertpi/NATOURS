const mongoose = require('mongoose');
const validator = require('validator');

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
    minlength: [8, 'Senha de do minimo 8 Caractere']
  },
  passwordConfirm:{
      type:String,
      required:[true,'Confirme sua senha'],
      minlength: [8, 'Senha de do minimo 8 Caractere']
  }
});

const User = mongoose.model('User', userSchema);

module.exports=User;

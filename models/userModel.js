const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

//name, email, photo, password, passwordConfirm

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    maxlength: [40, 'O nome não pode ser maior que 40 caracteres'],
  },

  email: {
    type: String,
    required: [true, 'O Email é necessario'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Um email valido'],
  },

  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user'
  },

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
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active:{
    type:Boolean,
    default: true,
    select: false,
  }
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});
userSchema.pre('save',function(next){
  if (!this.isModified('password')|| this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/,function(next){
  
  // Este é o ponto da tabela atual
  this.find ({active:{$ne:false }});
  next(); 
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JTWTimestamp) {
  if (this.passwordChangedAt) {
    const chanedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JTWTimestamp < chanedTimestamp;
  }
  //false not meas not changed
  return false;
};
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};


const User = mongoose.model('User', userSchema);

module.exports = User;

const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');


const filterObj = (obj, ...allowedFields)=>{
  const newObj = {};
  Object.keys(obj).forEach(el=>{
    if(allowedFields.includes(el)) newObj[el]=obj[el]
  })
  return newObj
}

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
}



exports.updateme = catchAsync(async (req, res, next) => {
  // 1 Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'Essa Rota não é para atualizar senha. Tente use /updateMyPassword ',
        400
      )
    );
  }
 //filtrando nomes de campos indesejados que não podem ser atualizado
  const filteredBody = filterObj(req.body,'name','email');
  
  // 3 Update user document
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updateUser
    }
  });
});

exports.deleteMe = catchAsync (async(req, res, next)=>{
  await User.findByIdAndUpdate(req.user.id,{active:false});
  res.status(204).json({
    status:'success',
    data:null
  });
});


exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined! use sigup',
  });
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
// DO NOT UPDATE PASSWORDS WITH THIS
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
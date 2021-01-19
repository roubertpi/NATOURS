

const AppError = require ("../utils/appError");

const handleCastErrorDB= err =>{
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
}
const sendErrorDev = (err,res)=>{
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack:err.stack
    });
}

const sendErrorProd = (err, res)=>{

    //Operational, trusted error: send message to client
    if (err.isOperational){
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    });
    //programming or other unknown error : dont leak erro details
}else {
    // 1 log error 
    console. error('ERRORRR', err);

    //  2 Send generit message
    res.status(500).json({
        status: 'Error',
        message:'Tem algo de errado!'
    })
}
}

module.exports=((err,req,res,next)=>{
    //console.log(err.stack);
  
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV ==='development'){
       sendErrorDev(err, res);
    }else if ( process.env.NODE_ENV === 'production'){

        let error = {...err};
        if (error.name === 'CastError') error = handleCastErrorDB(error)
        sendErrorProd(error, res);
    }

  });
const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    // não entendi direiro 
    const queryObj = {...req.query};
    const excludedFields= ['page','sort','limit','fields'];
    excludedFields.forEach(el=>delete queryObj[el]);
///
    
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match=>`$${match}`);
    console.log(JSON.parse(queryStr));
    
    
    const tours = await Tour.find(JSON.parse(queryStr));
    //Send Responde
    res.status(200).json({
      status: 'success',
      requestdAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTours = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Falhou',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'Falhou',
      message: 'invalid Data ',
    });
  }
};
exports.deleteTour = async(req, res) => {
  try{
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });

  }catch (err){
    res.status(400).json({
      status: 'Falhou',
      message: 'invalid Data ',
    });
  }
};

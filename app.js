const express = require('express');
const fs = require("fs");
const app = express();

app.use (express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res)=>{
  res.status(200).json({
    status:'success',
    results: tours.length,
    data:{
      tours
    }
  });
}
const getTours = (req, res) => {
  console.log(req.params);

  const id = req.params.id*1 // fazendo assim converte em numero ;
  const tour = tours.find(el =>el.id=== id);
  if (!tour){
    return res.status(404).json({
      status:'fail',
      message: 'Invalid'
    })
  }
  res.status(200).json({
    status: 'success',
    data: {
    tour
  },
  });
}
const creatTour = (req,res)=>{
  console.log (req.body);

  const newId = tours[tours.length-1].id +1;
  const newTour = Object
  .assign({ id:newId},req.body);

  tours.push(newTour);
  fs.writeFile
  (`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
    res.status(201).json(
    {
      status:'success',
      data:{
        tour:newTour
      }
      });
  });
}

const updateTour = (req,res)=>{

  if (req.params.id * 1 > tours.length){
    return res.status(404).json({
      status:'fail',
      message: 'Invalid'
    })
  }

  res.status(200).json({
    status: 'success',
    data:{
      tour:'<Updated tour here...>'
    }
  })
}
const deleteTour = (req,res)=>{

  if (req.params.id * 1 > tours.length){
    return res.status(404).json({
      status:'fail',
      message: 'Invalid'
    })
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
}

app.
  route('/api/v1/tours/')
  .get(getAllTours)
  .post(creatTour);

app
  .route('/api/v1/tours/:id')
  .get(getTours)
  .patch(updateTour)
  .delete(deleteTour)

const port = 3000;

app.listen(port, () => {
  console.log(`App funcionando na porta: ${port}`);
});

const mongoose = require('mongoose')
const dotenv = require('dotenv');
const app = require ('./app');
dotenv.config({
    path:'./config.env'
});

const DB = process.env.Database
.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose
//.connect(process.env.DATABASE_LOCAL,{
  .connect(DB,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() =>console.log('DB Conectado!!'));

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
  },
  rating: {
    type:Number,
    defoult:4.5
  },
  price:{
    type: Number,
    required:[true, 'A tour must have a price']
  }
});
const Tour = mongoose.model('Tours',tourSchema);

//console.log(process.env);
const port =process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App funcionando na porta: ${port}`);
});

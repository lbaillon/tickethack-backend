
const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://AmandineP:Capsule!0906$@cluster0.cpkmy.mongodb.net/tickethack';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
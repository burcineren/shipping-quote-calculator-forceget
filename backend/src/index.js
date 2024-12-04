import mongoose from 'mongoose';

const uri = 'mongodb+srv://burcineeren:zVYl33mxlMDLgomM@forceget.92g0b.mongodb.net/?retryWrites=true&w=majority&appName=forceget';

mongoose
  .connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));
const express = require('express');
const { mongo, default: mongoose } = require('mongoose');
require('dotenv').config()
const cors = require('cors');

const app = express();
const PORT = process.env.PORT 

app.use(cors({ origin: 'http://localhost:3001' }));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('Error connecting to MongoDB', err));



app.use(express.json())

app.use('/api/v1', require('./routes/contacts'))

app.listen(PORT,()=>console.log(`Serving on port ${PORT}`));
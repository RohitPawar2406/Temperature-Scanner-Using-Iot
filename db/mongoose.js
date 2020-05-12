const mongoose = require('mongoose')
console.log('Inside Mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/Temperature-Scanning', {
    useUnifiedTopology: true,
    useCreateIndex: true
})
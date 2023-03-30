// This will handle connection logic to Mongodb Database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TaskManager', { useNewUrlParser: true }).then(() => {
    console.log("Connect to MongoDB Successfully");
}).catch((e) => {
    console.log("Error while connecting to MOngoDB");
    console.log(e);
})

//TO prevent deprecation warning (from mongoDB native driver)
//mongoose.set('useCreateIndex', true);
//mongoose.set('useFindAndModify', false);


module.exports = { mongoose }
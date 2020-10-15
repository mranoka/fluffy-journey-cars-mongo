const express = require('express');
const app = express();
const fileHandler = require('fs');
const helmet = require("helmet");
const mongoose = require('mongoose');

// secure express app
app.use(helmet());

// include body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes to handle request from client
require('./routes/new.js')(app);
require('./routes/list.js')(app);
require('./routes/updateOne.js')(app);
require('./routes/delete.js')(app);
require('./routes/updateAll.js')(app);

//uri for connecting to database from Atlas
const uri = 'mongodb+srv://<>:<>@cluster0.fojyg.mongodb.net/test?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;

mongoose.connect(uri, {
	useMongoClient: true
});

mongoose.connection.on('error', function() {
	console.log('Connection to Mongo established.');
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

module.exports = app;


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`);
});
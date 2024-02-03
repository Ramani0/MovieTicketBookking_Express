var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { MongoClient } = require('mongodb');
var indexRouter = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

const uri = 'mongodb://127.0.0.1:27017/movieticket';

app.get('/index', (request, response) => {
  response.render('index'); // Change 'loginpage' to 'secondpage' for consistency
});

app.get('/signup', (request, response) => {
  response.render('registerpage'); // Change 'loginpage' to 'secondpage' for consistency
});
app.get('/contact', (request, response) => {
  response.render('contact'); // Change 'loginpage' to 'secondpage' for consistency
});
app.get('/stream', (request, response) => {
  response.render('stream'); // Change 'loginpage' to 'secondpage' for consistency
});
app.get('/ecp', (request, response) => {
  response.render('ecp'); // Change 'loginpage' to 'secondpage' for consistency
});
app.get('/events', (request, response) => {
  response.render('events'); // Change 'loginpage' to 'secondpage' for consistency
});
app.get('/booking', (request, response) => {
  response.render('booking'); // Change 'loginpage' to 'secondpage' for consistency
});
app.get('/corporate', (request, response) => {
  response.render('corporate'); // Change 'loginpage' to 'secondpage' for consistency
});




app.post('/check', async (req, res) => {
 console.log("..........................................................................")
});


app.use(express.json()); // Add this line to enable JSON request body parsing

app.post('/register', async (req, res) => {
  const { fname, lname, username, email, phone, password, gender } = req.body;

  console.log("calling.........................................................................");
  try {
    const client = new MongoClient(uri);
    await client.connect();

    const usersCollection = client.db().collection('customers');
    console.log(fname, username, email, phone, password, gender);

    const user = await usersCollection.insertOne({ fname, lname, username, email, phone, password, gender });

    res.send('<script>alert("please check your form database")</script>');
    client.close();
  } catch (error) {
    res.send('<script>alert("please check your form data")</script>');
  }
});




app.post('/corporate', async (req, res) => {
  const { fname,email,cname, phone } = req.body;

  try {
      const client = new MongoClient(uri);
      await client.connect();

      const usersCollection = client.db().collection('exp');
      console.log(  fname,email,cname, phone )
     
      const user = await usersCollection.insertOne({ fname,email,cname,phone});
      
      res.send('<script>alert("please check your form database")</script>')
      client.close();
  } catch (error) {
    res.send('<script>alert("please check your form data")</script>')
    
  }
});

// booking

app.post('/book', async (req, res) => {
  const { count,total } = req.body;
console.log(count,total,"sdjkflhasdkfjh")
res.send('<script>alert("please check your form data")</script>')
  /* try {
      const client = new MongoClient(uri);
      await client.connect();

      const usersCollection = client.db().collection('exp');
      console.log(  fname,email,cname, phone )
     
      const user = await usersCollection.insertOne({ fname,email,cname,phone});
      
      res.send('<script>alert("please check your form database")</script>')
      client.close();
  } catch (error) {
    res.send('<script>alert("please check your form data")</script>')
    
  } */
});





app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
      const client = new MongoClient(uri);
      await client.connect();

      const usersCollection = client.db().collection('customers');
      const user = await usersCollection.findOne({ username, password });

      if (user) {
          // Successful login, you can set up user sessions or tokens here
          
            res.send("login successfully")
         
      } else {
          res.send('Login failed');
      }

      client.close();
  } catch (error) {
      console.error('Error:', error);
      res.send('Error during login');
  }
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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





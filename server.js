const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');
// to make automatic routing
//app.use(express.static(__dirname + '/public'));

//It's middelware , no any app will run until you put next()
app.use((req,res,next) => {
  now = new Date().toString();
  var log = `${now}: ${req.method}  ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err) =>{
     if(err) {
       console.log('Unable to append to the server.log.');
     }
  });
 next();
});

app.use((req,res,next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

//to send current year to all views
hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});

//to send upper case
hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
});

app.get('/',(req,res) =>{
//  res.send('<h1>Hello Express</h1>');
// res.send({
//     name: 'Moh',
//     Schoole:'hight',
//     like:[
//       'bike',
//       'cars'
//     ]
//   });
 res.render('home.hbs',{
   pageTitle:'home page',
   welcomeMessage:'Welcome to my website',

 });

});

app.get('/about',(req,res) => {
//  res.send('about Page');
res.render('about.hbs',{
   pageTitle:'about page',

 });

});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage:'Unable to handel Request'
  });
});

app.listen(3000,() => {
  console.log('server is starting on port 3000 enjoy');
});

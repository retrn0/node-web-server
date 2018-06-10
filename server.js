const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamWords', text => {
  return text.toUpperCase();
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  let log = `${new Date().toString()} ${req.method} ${req.path} \n`;
  fs.appendFile('server.log', log, error => {
    console.log('something went wrong yo!');
  });
  console.log(log);
  next();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'This is a home page',
    welcomeMsg: 'Welcome to my world'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'uh oh something went wrong'
  });
});
app.listen(port, () => console.log(`server is up on port ${port}`));

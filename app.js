'use strict';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./api/config/database');

mongoose.Promise = require('bluebird');
mongoose.connect(config.database, {
  promiseLibrary: require('bluebird')
  })
  .then(() => console.log(`Connecté à la base de données -> ${config.database}`))
  .catch((err) => console.log(`Database error: ${err}`));

const app = express();

const users = require('./api/routes/users');
const port = 3000;

// CORS Middleware
app.use(cors());

// Paramétrage d'un dossier static pour les vues
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./api/config/passport')(passport);

app.use('/users', users);

app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html'));
});

app.use((req, res, next) => {
  const error = new Error("Not found:\nPage non trouvée :-P");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;



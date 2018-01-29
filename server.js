'use strict';

const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

app.listen(port, () => {
  console.log('Le serveur est lancé sur http://127.0.0.1:' + port);
});

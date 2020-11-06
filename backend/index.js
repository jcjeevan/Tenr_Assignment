const express = require('express');

const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const homeRoutes = require('./routes/home');

const errorController = require('./controllers/error');

const app = express();

const ports = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept, X-Custom-Header, Authorization'
  );
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

//Routing for the API

app.use('/auth', authRoutes);

app.use('/home', homeRoutes);

app.use(errorController.get404);
app.use(errorController.get500);

//Server Port Configuration
app.listen(ports, () => console.log(`Listening on port ${ports}`));

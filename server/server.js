'use strict';

const babelRegister = require('@babel/register');
babelRegister({
  ignore: [/[\\\/](build|server\/server|node_modules)[\\\/]/],
  presets: [['react-app', {runtime: 'automatic'}]],
  plugins: ['@babel/plugin-transform-modules-commonjs'],
});

const express = require('express');
const compress = require('compression');
const render = require('./render');

const PORT = process.env.PORT || 4000;
const app = express();

app.use((req, res, next) => {
  next();
});

app.use(compress());
app.get('/', (req, res) => {
  render(req.url, res);
});

app
  .listen(PORT, () => {
    console.log(`Listening at ${PORT}...`);
  })
  .on('error', function (error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const isPipe = (portOrPipe) => Number.isNaN(portOrPipe);
    const bind = isPipe(PORT) ? `Pipe ${PORT}` : `Port ${PORT}`;
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

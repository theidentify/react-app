const express = require('express');
const compress = require('compression');
const { readFileSync } = require('fs');

const PORT = process.env.PORT || 4000;
const app = express();

app.use((req, res, next) => {
  next();
});

app.use(compress());
app.get('/', (req, res) => {
  res.setHeader('Content-type', 'text/html');
  res.send(`
    <!DOCTYPE html>
    <html>
      <title>React App</title>
      <body>
        <h1>Opps</h1>
      </body>
    </html>
  `);
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

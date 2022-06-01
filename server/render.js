import * as React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';

module.exports = function render(url, res) {
  res.send('<!DOCTYPE html>' + renderToString(<App />));
};

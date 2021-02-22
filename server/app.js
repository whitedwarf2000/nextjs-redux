const { setConfig } = require('next/config');
setConfig(require('../next.config'));

const express = require('express');
const next = require('next');
const path = require('path');
const { Signale } = require('signale');
const routes = require('../src/routes');

const dev = process.env.NODE_ENV !== 'production';

const port = process.env.PORT || 3000;
const app = next({ dev });

const handle = routes.getRequestHandler(app);

const options = {
  scope: 'app server',
};
const signale = new Signale(options);

(async () => {
  await app.prepare();
  const server = express();

  server.use('/static', express.static('public/static'));
  if (!dev) {
    server.get('/service-worker.js', function (request, response) {
      response.sendFile(path.resolve(__dirname, '../.next/static', 'service-worker.js'));
    });
  }
  server.get('*', (req, res) => handle(req, res));
  server.use(handle);
  await server.listen(port);
  signale.success(`Application ready on:${port}`);
})();

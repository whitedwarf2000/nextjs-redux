const routes = (module.exports = require('next-routes')());

const urls = {
  root: 'home',
};

module.exports.urls = urls;
const { root } = urls;

const pattern = {
  homePath: '/',
};

module.exports.pattern = pattern;
const { homePath } = pattern;

routes.add(root, homePath, 'home'); // Information path must be always at last item

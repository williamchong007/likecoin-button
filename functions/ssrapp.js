const functions = require('firebase-functions');
const { Nuxt } = require('nuxt-start');

if ((functions.config().likeco || {}).testmode) {
  process.env.IS_TESTNET = true;
}

if ((functions.config().sentry || {}).report_uri) {
  process.env.SENTRY_REPORT_URI = functions.config().sentry.report_uri;
}

const nuxtConfig = require('./nuxt.config.js');

const config = {
  ...nuxtConfig,
  dev: false,
  buildDir: 'nuxt',
};
const nuxt = new Nuxt(config);

module.exports = functions.https.onRequest((req, res) => {
  res.removeHeader('X-Powered-By');
  res.set('Cache-Control', 'public, max-age=600, must-revalidate');
  return nuxt.render(req, res);
});

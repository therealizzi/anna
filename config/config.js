const Confidence = require('confidence');

/* $lab:coverage:off$ */
const environment = process.env.APP_ENV || 'production';

const config = {
  app: {
    host: process.env.HOST || 'https://www.newurlhere.com',
    port: parseInt(process.env.PORT || 3001),
  },
  mongo: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/anna',
    testuri: process.env.TEST_MONGODB_URL || 'mongodb://localhost:27017/anna-test',
  },
};

/* $lab:coverage:on$ */

const store = new Confidence.Store(config);

module.exports.get = (key) => store.get(key, environment);
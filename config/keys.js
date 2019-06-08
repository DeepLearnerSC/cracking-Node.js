if (process.env.NODE_ENV === 'production') {
  //module.exports = require('./prod');
  module.exports = require('./prodSample');
} else if (process.env.NODE_ENV === 'ci') {
  module.exports = require('./ci');
} else {
  //module.exports = require('./dev');
  module.exports = require('./devSample');
}

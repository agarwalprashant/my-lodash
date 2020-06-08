module.exports = function () {
  return {
    files: [
      '*.js',
      '.internal/*.js',
      { pattern: 'node_modules/lodash/**/*.js', instrument: false },
      'test/*.js',
      '!test/*.test.js',
      '!wallaby.js'
    ],

    tests: ['test/*.test.js'],

    env: {
      type: 'node',
      params: {
        runner: `-r ${require.resolve('esm')}`
      }
    },

    setup(w) {
      const path = require('path');
      const lodashPath = path.join(w.localProjectDir, 'node_modules/lodash/lodash.js');
      process.argv[process.argv.length - 1] !== lodashPath && process.argv.push(lodashPath);
    }
  };
};
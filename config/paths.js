const { resolvePath } = require('./webpack/partials/helpers');
const path = require('path')

module.exports = {
  public: resolvePath(__dirname, 'public'),
  src: resolvePath(__dirname, 'src'),
  build: resolvePath(__dirname, 'build'),
  staticWasm: resolvePath('build/static/wasm'),
}

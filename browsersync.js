const serve = require('browser-sync')
const proxy = require('http-proxy-middleware')
const path = require('path')
const Bundler = require('parcel-bundler')

const bundler = new Bundler(path.resolve(__dirname, 'src', 'app.js'), {
  cache: true,
  minify: false,
  sourceMaps: true,
  watch: true,
  outDir: path.join(__dirname, 'dist'),
  publicUrl: '/',
  detailReport: true,
  cache: true,
  minify: true,
  sourceMaps: true,
  http: true
})

serve({
  port: 3000,
  open: false,
  watch: true,
  files: [
    path.join(__dirname, 'dist'),
    path.join(__dirname, 'views/**'),
  ],
  server: {
    baseDir: path.join(__dirname, 'dist')
  },
  middleware: [
    proxy('http://localhost:8080', {}),
    bundler.middleware()
  ]
})
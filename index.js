var vinylFile = require('vinyl-file').read
var vinylWrite = require('vinyl-write')
var File = require('vinyl')
var glob = require('pull-glob')
var pull = require('pull-stream')
var path = require('path')

exports.src = exports.read = read
exports.dest = exports.write = write
exports.map = map

function read (pattern, options) {
  return pull(
    // Resolve patterns to file paths
    glob(pattern),
    // Map file paths to `Vinyl` objects
    pull.asyncMap(function (filePath, cb) {
      vinylFile(filePath, options)
      .then(file => cb(null, file))
      .catch(cb)
    })
  )
}

function write (base, done) {
  return function (read) {
    read(null, function next (end, file) {
      if (end) return done(end === true ? null : end)
      // Change base to the specificied directory
      if (base) file.path = path.resolve(base, file.relative)
      // Write the file
      vinylWrite(file, function (err) {
        read(err, next)
      })
    })
  }
}

function map (name, base) {
  return pull.map(function (source) {
    var filename = typeof name === 'function' ? name(source) : name
    var basedir = typeof base === 'function' ? base(source) : base
    return new File({
      path: path.resolve(basedir || process.cwd(), filename),
      base: basedir,
      contents: source
    })
  })
}

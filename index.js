var vinylFile = require('vinyl-file').read
var vinylWrite = require('vinyl-write')
var glob = require('pull-glob')
var pull = require('pull-stream')
var path = require('path')

exports.src = exports.read = read
exports.dest = exports.write = write

/**
 * Read a glob or path from the file system
 * and source `Vinyl` objects.
 */
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

/**
 * Write `Vinyl` objects to the file system
 * as a sink stream.
 */
function write (dir) {
  return function (read) {
    return function (end, cb) {
      read(end, function next (end, file) {
        if (end) return cb(end)

        // Change base to the specificied directory
        file.path = path.resolve(dir, file.relative)

        // Write the file
        vinylWrite(file, cb)
      })
    }
  }
}

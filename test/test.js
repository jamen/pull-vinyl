var test = require('tape')
var pull = require('pull-stream')
var vinyl = require('../')
var rimraf = require('rimraf')

function clean () {
  rimraf.sync(`${__dirname}/output`)
}

clean()
test.onFinish(clean)

test('read', t => {
  pull(
    vinyl.src(`${__dirname}/files/**/*.txt`, { base: `${__dirname}/files` }),
    pull.collect((err, files) => {
      t.is(files.length, 5, 'correct amount of files')

      var names = files.map(x => x.basename)

      t.not(names.indexOf('baz.txt'), -1, 'contains baz.txt')
      t.not(names.indexOf('mars.txt'), -1, 'contains mars.txt')
      t.is(names.indexOf('pluto.js'), -1, 'does not contain pluto.js')
      t.is(names.indexOf('qux.js'), -1, 'does not contain qux.js')

      t.end(err)
    })
  )
})

test('write', t => {
  pull(
    vinyl.src(`${__dirname}/files/**/*.js`, { base: `${__dirname}/files` }),
    vinyl.dest(`${__dirname}/output`, err => {
      t.false(err, 'no error')

      var exists = true
      try {
        require(`${__dirname}/output/hello/pluto.js`)
      } catch (err) {
        exists = false
      }

      t.true(exists, 'file exists')
      t.end()
    })
  )
})

test('map', t => {
  t.plan(1)

  pull(
    pull.values([ Buffer.from('hello world') ]),
    vinyl.map('bar.js', '/foo'),
    pull.drain(function (file) {
      t.is(file.path, '/foo/bar.js', 'correct path')
    })
  )
})

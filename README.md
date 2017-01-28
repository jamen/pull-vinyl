# pull-vinyl [![NPM version](https://badge.fury.io/js/pull-vinyl.svg)](https://npmjs.org/package/pull-vinyl) [![Build Status](https://travis-ci.org/jamen/pull-vinyl.svg?branch=master)](https://travis-ci.org/jamen/pull-vinyl)

> Read and write `Vinyl` objects in the file system.

```js
pull(
  // Read `Vinyl` files
  vinyl.src('foo/**/*.js'),

  // Transform them somehow, i.e. with a compiler.
  transformVinyl(),

  // Write them
  vinyl.dest('output')
)
```

Reading and writing [`Vinyl`](https://github.com/gulpjs/vinyl) objects to/from the file system with pull streams.  It is inspired from [`vinyl-fs`](https://github.com/gulpjs/vinyl-fs) from gulp.

## Installation

```sh
$ npm install --save pull-vinyl
```

## API

### `vinyl.src(pattern, [options])`

Read `Vinyl` objects from the file system with patterns from [`pull-glob`](https://npmjs.com/pull-glob).  You can use `vinyl.read` as an alias.

 - `pattern`: A glob pattern resolved by `pull-glob`.
 - `options` (`Object`): Options for reading.

It works as a [pull stream source](https://github.com/pull-stream/pull-stream#source-aka-readable):

```js
pull(
  // Resolve glob into `Vinyl` objects.
  vinyl.src('foo/**/*.js'),
  // Transform `Vinyl` objects...
  // Then write them:
  vinyl.dest('bar')
)
```

### `vinyl.dest([base]])`

Write `Vinyl` objects at the `directory` base.  You can use `vinyl.write` as an alias.

 - `base` (`String`): The base directory for the `Vinyl` objects.  Defaults to `file.base`.

```js
pull(
  // Obtain `Vinyl` objects somehow, probably through reading:
  vinyl.src('foo/**/*.js'),

  // Transform them before you write them:
  babel(), // Example stream.

  // Write them to the given directory
  vinyl.dest('out')
)
```

### `vinyl.map(name, [base])`

Maps data into vinyl files.  Essentially [`vinyl-source-stream`](https://npmjs.com/vinyl-source-stream) as a pull-stream.

 - `name` (`String`|`Function`): String of file's name, or a function to handle per item.
 - `base` (`String`|`Function`): Optional base directory string, or a function to handle per item.

```js
pull(
  // Pipe some data:
  pull.values([ Buffer.from('hello world') ]),

  // Map it to a file:
  vinyl.map('bar.js', '/foo'),

  // Use it
  pull.drain(function (file) {
    console.log(file)
  })
)
```

## License

MIT © [Jamen Marz](https://github.com/jamen)

# pull-vinyl [![NPM version](https://badge.fury.io/js/pull-vinyl.svg)](https://npmjs.org/package/pull-vinyl) [![Build Status](https://travis-ci.org/jamen/pull-vinyl.svg?branch=master)](https://travis-ci.org/jamen/pull-vinyl)

> Read and write `Vinyl` objects in the file system.

```js
pull(
  // Read `Vinyl` files
  vinyl.src('foo/**/*.js'),

  // Transform them somehow, i.e. with a compiler.
  transformVinyl(),

  // WWrite them
  vinyl.dest('output')
)
```

For reading and writing [`Vinyl`](https://github.com/gulpjs/vinyl) objects to and from the file system with pull streams.  It is inspired from [`vinyl-fs`](https://github.com/gulpjs/vinyl-fs)

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
  vinyl.src('foo/**/*.js'),
  // transform `Vinyl` objects
  // then write them
  vinyl.dest('bar')
)
```

### `vinyl.dest(directory)`

Write `Vinyl` objects at the specified `directory` being the base.  You can use `vinyl.write` as an alias.

 - `directory` (`String`): The base directory for the `Vinyl` objects.

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

## License

MIT © [Jamen Marz](https://github.com/jamen)

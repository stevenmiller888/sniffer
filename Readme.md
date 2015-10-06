
# Sniffer
[![NPM version][npm-image]][npm-url]
[![build status][circle-image]][circle-url]
[![license][license-image]][license-url]

A cross-platform network sniffer.

## Installation

    $ npm install network-sniffer

## Usage

```js
var Sniffer = require('network-sniffer');
var sniffer = Sniffer();

// start sniffing on channel 5
sniffer.start(5);

// or, with an optional callback
sniffer.start(5, function(file) {
  // `file` is the path to the capture file
});

// stop sniffing on channel 5
sniffer.stop(5);
```

You can use [scanner](https://github.com/stevenmiller888/scanner) to find the channels of all available wireless networks.

## Note

If you are running Linux or Windows, and you do not have `airodump-ng` installed, then install it (and the rest of the aircrack suite) with:

`apt-get install aircrack-ng`

## License

[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/network-sniffer.svg?style=flat-square
[npm-url]: https://npmjs.org/package/network-sniffer
[circle-image]: https://img.shields.io/circleci/project/stevenmiller888/sniffer.svg
[circle-url]: https://circleci.com/gh/stevenmiller888/sniffer
[license-image]: https://img.shields.io/npm/l/express.svg
[license-url]: https://tldrlegal.com/license/mit-license

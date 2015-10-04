
/**
 * Dependencies.
 */

var spawn = require('child_process').spawn;

/**
 * Network sniffers.
 */

var sniffersByPlatform = {
  darwin: {
    cmd: '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/A/Resources/airport',
    args: ['en0', 'sniff']
  },
  linux: {
    cmd: 'airodump-ng',
    args: ['-w', 'dump', '-c']
  },
  win32: {
    cmd: 'airodump-ng',
    args: ['-w', 'dump', '-c']
  }
};

/**
 * Expose `Sniffer`.
 */

module.exports = Sniffer;

/**
 * Sniffer.
 */

function Sniffer() {
  if (!(this instanceof Sniffer)) return new Sniffer();
  this.channels = {};
}

/**
 * Start sniffing network traffic on the given channel.
 *
 * @param {String} channel
 */

Sniffer.prototype.start = function(channel) {
  var nativeSniffer = sniffersByPlatform[process.platform];
  nativeSniffer.args.push(channel);
  this.channels[channel] = spawn(nativeSniffer.cmd, nativeSniffer.args);
};

/**
 * Stop sniffing network traffic on the given channel.
 *
 * @param {String} channel
 */

Sniffer.prototype.stop = function(channel) {
  this.channels[channel].kill();
};

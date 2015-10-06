
/**
 * Dependencies.
 */

var spawn = require('child_process').spawn;
var lsof = require('lsof');

/**
 * Network sniffers.
 */

var sniffersByPlatform = {
  darwin: {
    cmd: '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/A/Resources/airport',
    args: ['en0', 'sniff'],
    cap: 'airportSniff'
  },
  linux: {
    cmd: 'airodump-ng',
    args: ['-w', 'captured_packets', '-c'],
    cap: 'captured_packets'
  },
  win32: {
    cmd: 'airodump-ng',
    args: ['-w', 'captured_packets', '-c'],
    cap: 'captured_packets'
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
 * @param {Function} callback
 */

Sniffer.prototype.start = function(channel, callback) {
  var nativeSniffer = sniffersByPlatform[process.platform];
  nativeSniffer.args.push(channel);
  var child = this.channels[channel] = spawn(nativeSniffer.cmd, nativeSniffer.args);

  // find the capture file
  if (callback) {
    findCapFile(child.pid);

    function findCapFile(pid) {
      lsof.raw(pid, function(files) {
        var found = false;

        files.forEach(function(file) {
          if (!file || !file.name) return;
          if (file.name.indexOf(nativeSniffer.cap) !== -1) {
            found = true;
            callback(file.name);
          }
        });

        if (!found) {
          findCapFile(pid);
        }
      });
    }
  }
};

/**
 * Stop sniffing network traffic on the given channel.
 *
 * @param {String} channel
 */

Sniffer.prototype.stop = function(channel) {
  this.channels[channel].kill();
};

'use strict';

var
  exec = require('child_process').exec;


function acpi(callback) {
  exec('acpi -bact', function (error, stdout, stderror) {
    if (error) {
      callback(error);
      return;
    }

    var
      batteries = {},
      adapter = {},
      thermal = {},
      cooling = {},
      misc = [],
      lines = stdout.split('\n');

    lines.map(function (line) {
      var res = /^(Battery|Adapter|Thermal|Cooling) (\d+)\:/.exec(line);
      if (res && res[1]) {
        switch (res[1]) {
        case 'Battery':
          var
            bs = line.replace(res[0], '').split(',');
          batteries[res[2]] = {
            'status': bs[0].trim(),
            'charge': parseInt(bs[1], 10),
            'rate': bs[2] ? bs[2].trim() : ''
          };
          break;
        case 'Adapter':
          adapter[res[2]] = {
            'onLine': 'on-line' === line.replace(res[0], '').trim()
          };
          break;
        case 'Thermal':
          var
            ts = line.replace(res[0], '').split(',');
          thermal[res[2]] = {
            'status': ts[0].trim(),
            'temp': parseInt(ts[1], 10),
            'degrees': 'Celsius'
          };
          break;
        case 'Cooling':
          cooling[res[2]] = {
            'status': line.replace(res[0], '').trim()
          };
          break;
        default:
          misc.push(line);
        }
      }
    });

    callback(null, {
      'batteries': batteries,
      'adapter': adapter,
      'thermal': thermal,
      'cooling': cooling,
      'misc': misc
    });
  });
}

module.exports = exports = acpi;

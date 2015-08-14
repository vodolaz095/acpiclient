# acpiclient

[![Build Status](https://travis-ci.org/vodolaz095/acpiclient.svg)](https://travis-ci.org/vodolaz095/acpiclient)

NodeJS wrapper around [http://sourceforge.net/projects/acpiclient/](http://sourceforge.net/projects/acpiclient/)
It outputs battery, temperature, adapter and cooling information as output of `acpi` command.

# Requirements
You need to install [acpi](http://sourceforge.net/projects/acpiclient/).
It is present on all modern Linux distributions, at least at official repos 

```shell

  $ su -c 'yum install acpi'
  $ su -c 'apt-get install acpi'
  $ su -c 'zypper install acpi'
  $ su -c 'emerge [-a] acpi'

```



# Example

```javascript

    var acpiclient = require('acpiclient');
    
    acpiclient(function (error, data) {
      if (error) {
        throw error;
      }
      console.log(data);
    });
```

Will output something like

```

    {
    "batteries": {
      "0": {
        "status": "Full",
        "charge": 100,
        "rate": ""
      },
      "1": {
        "status": "Discharging",
        "charge": 0,
        "rate": "rate information unavailable"
      }
    },
    "adapter": {
      "0": {
        "onLine": true
      }
    },
    "thermal": {
      "0": {
        "status": "ok",
        "temp": 51,
        "degrees": "Celsius"
      }
    },
    "cooling": {
      "0": {
        "status": "LCD 0 of 10"
      },
      "1": {
        "status": "LCD 0 of 10"
      },
      "2": {
        "status": "Processor 0 of 10"
      },
      "3": {
        "status": "Processor 0 of 10"
      },
      "4": {
        "status": "Processor 0 of 10"
      },
      "5": {
        "status": "Processor 0 of 10"
      }
    },
    "misc": []
    }

```
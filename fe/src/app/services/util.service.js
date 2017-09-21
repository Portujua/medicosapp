angular.module('app')
  .service('DateUtil', function($filter) {
    return {
      isSame(date1, date2) {
        date1 = moment($filter('date')(date1, 'yyyy-MM-dd'));
        date2 = moment($filter('date')(date2, 'yyyy-MM-dd'));
        return date1.isSame(date2);
      },
      isAfter(date1, date2, includeLimits) {
        date1 = moment($filter('date')(date1, 'yyyy-MM-dd'));
        date2 = moment($filter('date')(date2, 'yyyy-MM-dd'));
        if (includeLimits) {
          return date1.isAfter(date2) || date1.isSame(date2);
        }
        return date1.isAfter(date2);
      },
      isBefore(date1, date2, includeLimits) {
        date1 = moment($filter('date')(date1, 'yyyy-MM-dd'));
        date2 = moment($filter('date')(date2, 'yyyy-MM-dd'));
        if (includeLimits) {
          return date1.isBefore(date2) || date1.isSame(date2);
        }
        return date1.isBefore(date2);
      },
      isBetween(date1, min, max, includeLimits) {
        return this.isAfter(date1, min, includeLimits) && this.isBefore(date1, max, includeLimits);
      },

      convertDatesToStrings(date) {
        if (_.isDate(date)) {
          return $filter('date')(date, 'yyyy-MM-dd');
        }
        else {
          return date;
        }
      },

      // http://jsfiddle.net/kQZw8/157/
      convertDateStringsToDates(input) {
        // Ignore things that aren't objects.
        if (typeof input !== 'object') {
          return input;
        }

        for (let key in input) {
          if (!input.hasOwnProperty(key)) {
            continue;
          }

          let value = input[key];
          let match;
          // Check for string properties which look like dates.
          // TODO: Improve this regex to better match ISO 8601 date strings.
          if (typeof value === 'string' && (match = value.match(/^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i))) {
            // Assume that Date.parse can parse ISO 8601 strings, or has been shimmed in older browsers to do so.
            let milliseconds = Date.parse(match[0]);
            if (!isNaN(milliseconds)) {
              input[key] = new Date(milliseconds);
            }
          } else if (typeof value === 'object') {
            // Recurse into object
            this.convertDateStringsToDates(value);
          }
        }
      }
    };
  })


  .service('TimeUtil', function($filter) {
    return {
      getDuration(date1, date2, period) {
        return Math.round(moment(date1).diff(moment(date2), period, true) * 100000) / 100000;
      },
      copyTime(date1, time) {
        if (_(date1).isDate() && _(time).isDate()) {
          date1.setHours(time.getHours());
          date1.setMinutes(time.getMinutes());
          date1.setSeconds(time.getSeconds());
        }
        return date1;
      },
      setTime(date, hours = 0, minutes = 0, seconds = 0) {
        if (_(date).isDate()) {
          date.setHours(hours);
          date.setMinutes(minutes);
          date.setSeconds(seconds);
        }
        return date;
      },
      addDuration(date1, duration, period) {
        return moment(date1).add(duration, period).toDate();
      },
      subtractDuration(date1, duration, period) {
        return moment(date1).subtract(duration, period).toDate();
      },
      isSame(date1, date2) {
        date1 = moment($filter('date')(date1, 'yyyy-MM-dd HH:mm'));
        date2 = moment($filter('date')(date2, 'yyyy-MM-dd HH:mm'));
        return date1.isSame(date2);
      },
      isAfter(date1, date2, includeLimits) {
        date1 = moment($filter('date')(date1, 'yyyy-MM-dd HH:mm'));
        date2 = moment($filter('date')(date2, 'yyyy-MM-dd HH:mm'));
        if (includeLimits) {
          return date1.isAfter(date2) || date1.isSame(date2);
        }
        return date1.isAfter(date2);
      },
      isBefore(date1, date2, includeLimits) {
        date1 = moment($filter('date')(date1, 'yyyy-MM-dd HH:mm'));
        date2 = moment($filter('date')(date2, 'yyyy-MM-dd HH:mm'));
        if (includeLimits) {
          return date1.isBefore(date2) || date1.isSame(date2);
        }
        return date1.isBefore(date2);
      },
      isBetween(date1, min, max, includeLimits) {
        return this.isAfter(date1, min, includeLimits) && this.isBefore(date1, max, includeLimits);
      },
    };
  })


  .service('StringUtil', function($filter) {
    return {
      getGUID() {
        let d = new Date().getTime();

        if (window.performance && typeof window.performance.now === 'function') {
          d += performance.now(); //use high-precision timer if available
        }
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          let r = (d + Math.random() * 16) % 16 | 0;

          d = Math.floor(d / 16);
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });

        return uuid;
      },
    };
  })


  .service('NumericUtil', function($filter) {
    return {
      round(value, decimals = 2) {
        if (_.isUndefined(value)) {
          return 0;
        }

        return parseFloat($filter('number')(value, decimals));
      },
      /**
      * Returns a random integer between min (inclusive) and max (inclusive)
      * Using Math.round() will give you a non-uniform distribution!
      */
      random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      toFraction(value) {
        return isNaN(value) ? value : $filter('fraction')(value);
      },
      /**
       * gives you an object {deg:, min:, sec:, dir:} with sec truncated to two digits (e.g. 3.14)
       * and dir being one of N, E, S, W depending on whether you set the lng (longitude)
       * @param  {number} D   [description]
       * @param  {is longitude} lng [description]
       * @return {Object}     [description]
       *
       *  convertDDToDMS(-18.213, true) == {
             deg : 18,
             min : 12,
             sec : 46.79,
             dir : 'W'
          }
       */
      convertDDToDMS(D, lng, toString) {
        let ret = {
          dir: D < 0 ? lng ? 'W' : 'S' : lng ? 'E' : 'N',
          deg: 0 | (D < 0 ? D = -D : D),
          min: 0 | D % 1 * 60,
          sec: (0 | D * 60 % 1 * 6000) / 100,
        };

        return toString ? `${ret.deg}° ${ret.min}' ${ret.sec}" ${ret.dir}` : ret;
      }
    };
  })


  .service('ArrayUtil', function($filter) {

  });










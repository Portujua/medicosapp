/**
 * Underscore.string
 *
 * Proxy filter for calling Underscore.string functions.
 * http://epeli.github.io/underscore.string/#home
 *
 * Examples:
 *
 *     {{ name | s:'swapCase' }}
 *     {{ separator | s:'join':['foo', 'bar'] }}
 *     {{ tab.title | s:'prune':[20] | available }}
 *
 * @param {String} s String to filter
 * @param {String} fn Underscore.string function to call
 * @param {[params]} params Extra parameters to pass to Underscore.string
 * @return {String} Filtered string
 */
angular.module('app')
  .filter('s', () => {
    return (str, fn, params) => {
      str = str || '';
      params = params || [];
      params.unshift(str);
      return fn ? s[fn].apply(this, params) : str;
    };
  })

  // _.available("foo Bar")
  // => "foo Bar"
  // _.available("")
  // => "N/A"
  .filter('available', () => {
    return (input, attr) => {
      attr = attr || attr === '' ? attr : 'N/A';
      if (_.isString(input)) {
        input = input.trim();
      }
      return (_.isNull(input) || s.isBlank(input) || _.isUndefined(input)) ? attr : input;
    };
  })

  .filter('defaultImage', () => {
    return (input, attr) => {
      attr = attr || attr === '' ? attr : 'images/no-picture-profile.png';
      if (_.isString(input)) {
        input = input.trim();
      }
      return (_.isNull(input) || s.isBlank(input) || _.isUndefined(input)) ? attr : input;
    };
  })

  // removeSpaces('Hello world')
  // => "Helloworld"
  .filter('removeSpaces', () => {
    return (str) => {
      return _(str).isString() ? str.replace(/ /g, '') : str;
    };
  })

  .filter('removeSeconds', () => {
    return (str) => {
      return str.substring(0, 5);
    };
  })

  // _.conditional(true)
  // => "Yes"
  // _.conditional(1)
  // => "Yes"
  // _.conditional(null)
  // => "No"
  // _.conditional(false, "Aja", "Nei")
  // => "Nei"
  .filter('conditional', () => {
    return (input, positive, negative, compareTo = true) => {
      let t = positive || 'Yes',
          f = negative || 'No';

      return input === compareTo ? t : f;
    };
  })

  //  fraction(3.5)
  //  => 3 1/2
  .filter('fraction', () => {
    return (value) => {
      return Ratio.parse(value).simplify().toQuantityOf(2, 3, 4, 5, 8, 16, 32, 40).toLocaleString();
    };
  })

  // {{ value | type:{ a: 'Something', b: 'Other' } }}
  // value = 'a' => Something
  // value = 'b' => Other
  // value = 'c' => c
  .filter('type', () => {
    return (input, types) => {
      if (_.isEmpty(types)) {
        return input;
      }

      return _.has(types, input) ? types[input] : input;
    };
  })

  // {{ value | strcontain:filter:fieldName }}
  // value = 'Lorem ipsum', filter = 'Lorem' => 'Lorem ipsum'
  // value = 'lorem ipsum', filter = 'Lorem' => none
  // value = { name: 'lorem ipsum' }, filter = 'Lorem', fieldName = 'name' => 'Lorem ipsum'
  .filter('strcontain', () => {
    return (input, substr, field = null) => {
      if (_.isEmpty(substr) || _.isNull(input)) {
        return input;
      }

      return input.filter((item) => {
        return _.isNull(field) ? item.indexOf(substr) > -1 : item[field].indexOf(substr) > -1;
      })
    };
  })

  // Converts "Hello [~someUsername~someUUID]" to "Hello @someUsername"
  // Where the @someUsername is a clickeable link
  .filter('mentions', () => {
    return (input, includeHtml = true) => {
      if (_.isNull(input) || _.isUndefined(input)) {
        return input;
      }

      return input.replace(/\[~[a-zA-Z0-9]+~[a-zA-Z0-9-]+\]/g, (match) => {
        let username = match.slice(2, match.lastIndexOf('~'));
        let id = match.slice(match.lastIndexOf('~') + 1, -1);
        return includeHtml ?
          `<span style="cursor: pointer; color: #0c86a2;" drilldown="{ title: '${username}', component: 'usersView', id: '${id}' }">@${username}</span>`
          : `@${username}`;
      })
    };
  });

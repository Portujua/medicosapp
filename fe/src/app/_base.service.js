class BaseService {
  constructor() {
    let ngAppElem = angular.element(document.querySelector('[ng-app]') || document);
    this.$templateCache = ngAppElem.injector().get('$templateCache')
  }

  newFilter(field, operator, value = null) {
    return {
      field: field,
      operator: operator,
      value: value,
      toString: () => `${field}~${operator}~${!_.isNull(value) ? value : ''}`
    }
  }

  /*
   * @param entity
   * @type String|Array
   * @description Can be either string or array. If array is passed then expand will be created based on this array; otherwise the string can be either entity (as main role) or the template name (see @param type for more info)
   * @example 'jobs', 'views/jobs/jobs.list.html'
   * 
   * @param type
   * @type String
   * @description Can be either string or undefined. If undefined is passed then will assume first parameter as template name, otherwise will be used as expand type
   * @example 'view', 'list'
   * 
   * @param folder
   * @type String
   * @description If passed will be used as the folder name to build the template name
   * @example 'bhas' to make a call like getExpand('bhaComponents', 'list', 'bhas')
   * 
   * @return Returns the expand string
   * @type String
   */
  getExpand(entity, type, folder = null) {
    // Remove this values from expand
    let bannedValues = ['itemValue', 'name', 'startDate', 'endDate', 'estimatedStartDate', 'estimatedEndDate', 'data']

    // Check for values integrity
    if (_.isUndefined(entity)) {
      console.error('First param can not be undefined')
      return '';
    }
    
    if (_.isArray(entity)) {
      return this.__getExpandString(entity);
    }

    if (_.isNull(folder)) {
      folder = entity;
    }

    let templateName = entity.indexOf('html') > -1 ? entity : `views/${folder}/${entity}.${type}.html`;
    let templateCode = this.$templateCache.get(templateName);

    if (_.isUndefined(templateCode)) {
      console.error(`Couldn't find '${templateName}' template. (Is the tab open?)`);
      return '';
    }

    /**
     * Check if templateCode is single line
     * Case: <div>{{ some.var }}<div> {{ some.otherVar }}<div></div></div></div>
     * Reason: If the templateCode is single line (which occurs when building the solution) the regex will only match the first occurrence, so we need to add breaklines to it. We will add them after every > character
     */
    if ((templateCode.match(/\n/g) || []).length <= 1) {
      templateCode = templateCode.replace(/\>/g, '>\n');
    }

    let regexes = [
      /(.+)?{{\s?([\$a-zA-Z0-9\_\[\]]+)\.?([a-zA-Z0-9\.\_]+)?(.+)?\s?}}(.+)?/g, // {{ regex.forThis }}
      /(.+)?ng-repeat.+in\s([\$a-zA-Z0-9\_\[\]]+)\.?([a-zA-Z0-9\.\_]+)?(.+)?(.+)?/g, // ng-repeat="regex in for.this"
    ];
    let expand = [];
    let match = null;
    
    _.each(regexes, (regex) => {
      while (match = regex.exec(templateCode)) {
        let e = match[3];

        // Check for recursive (field.innerField)
        if (!_.isUndefined(e)) {
          if (e.indexOf('.') > -1) {
            // Add every recursive field but the last and 'data' field
            let f = null;
            let split = e.split('.')

            for (let i = 0; i < split.length - 1; i++) {
              /*
               * Do not add data field
               * Case: $ctrl.data.type.itemValue
               * Reason: This will result in expand .data.type which doesn't exists
               */
              if (split[i] === 'data') {
                continue;
              }

              f = _.isNull(f) ? split[i] : `${f}.${split[i]}`
            }

            if (!_.isNull(f)) {
              expand.push(f)
            }
          }
          else {
            expand.push(e)
          }
        }
      }
    })

    // Remove duplicates
    expand = _.uniq(expand);

    // Remove numbers
    expand = _.filter(expand, (val) => {
      return !/[0-9]/.test(val);
    })

    // Remove banned values
    expand = _.difference(expand, bannedValues)

    return this.__getExpandString(expand);
  }

  __getExpandString(arr) {
    if (!_.isArray(arr)) {
      console.error(`Expand must be an array, but ${typeof arr} received`);
      return '';
    }

    if (arr.length > 0) {
      arr[0] = '.' + arr[0];
    }

    return arr.join(',.');
  }

  getQueryString(query) {
    let params = angular.copy(query);

    // Calculating actual page
    if (!_.isUndefined(params.page)) {
      params.page--;
    }

    // Flatten sort
    if (_.isArray(params.sort)) {
      params.sort = _.first(params.sort);
    }

    // Filters
    if (!_.isEmpty(params.filter)) {
      let filters = params.filter;
      params.filter = '';
      for (let key in filters) {
        if (filters.hasOwnProperty(key) && !_.isUndefined(filters[key]) && !_.isNull(filters[key]) && filters[key] !== '') {
          // Format value if it's a date
          if (_.isDate(filters[key])) {
            filters[key] = filters[key].toISOString().slice(0, 10);
          }

          // If the value has a date format
          let match,
              exp = /^\d{4}-\d\d-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?$/i;

          if (_.isString(filters[key]) && (match = filters[key].match(exp))) {
            // Assume that Date.parse can parse ISO 8601 strings, or has been shimmed in older browsers to do so.
            let milliseconds = Date.parse(match[0]);
            if (!isNaN(milliseconds)) {
              let date = new Date(milliseconds).toISOString().slice(0, 10).split('-');
              // 0: yyyy
              // 1: MM
              // 2: dd
              filters[key] = `${date[1]}-${date[2]}-${date[0]}`;
            }
          }

          params.filter += `${key}:${filters[key]};`;
        }
      }
    }

    // is desc order?
    if (!_.isEmpty(params.sort)) {
      params.sort = s.include(params.sort, '-') ?
        `${ params.sort.replace(/-/, '') },desc` : `${ params.sort.replace(/\+/, '') },asc`;
    }

    return params;
  }

  getActives(keyword, sort, filter, arg1, arg2, arg3) {
    return this.list({
      keyword,
      filter,
      sort,
      simple: true,
      active: true,
    }, arg1, arg2, arg3);
  }
};
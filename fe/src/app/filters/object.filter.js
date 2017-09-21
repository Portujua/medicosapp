angular.module('app')
	/* Returns the field value of an object
	* Examples:
	*
	*     {{ user | getField:'name':'id':'1' }} Returns the 'name' field of the object which 'id' is '1'
	*/
  .filter('getField', () => {
    return (obj, nameField, idField, idValue) => {
      if (_.isString(idValue)) {
        if (idValue[0] === '{' && idValue[idValue.length - 1] === '}') {
          idValue = JSON.parse(idValue);
        }
      }

      for (let i = 0; i < obj.length; i++) {
        if (!_.isObject(idValue)) {
        	if (obj[i][idField] === idValue) {
        		return obj[i][nameField];
        	}
        }
        else {
          if (obj[i][idField] === idValue[idField]) {
            return obj[i][nameField];
          }
        }
      }

      return 'N/A';
    };
  })
angular.module('app')
  // Reverse an array
  // [1, 2, 3] => [3, 2, 1]
  .filter('reverseList', () => {
    return (items) => {
      if (_.isEmpty(items)) {
        return [];
      }
      return items.slice().reverse();
    };
  })

  // Offset the array
  .filter('startFrom', () => {
    return (input, start) => {
      if (_(input).isArray()) {
        start = +start;
        return input.slice(start);
      }
      throw Error('input is not an array');
    };
  });

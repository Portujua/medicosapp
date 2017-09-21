;(() => {

class SearchController {
  constructor($scope, $interval) {
    this.$scope = $scope;
    this.search_ = _.isFunction($scope.change) ? $scope.change : null;
    this.callback = _.isFunction($scope.callback) ? $scope.callback : null;
    this.delay = _.isNumber($scope.delay) ? $scope.delay : 500;
    this.placeholder = _.isString($scope.placeholder) ? $scope.placeholder : '';
    this.hasFocus = false;
    this._mouseOver = false;

    this.allowEmptySearch = _.isBoolean($scope.allowEmptySearch) ? $scope.allowEmptySearch : false;

    this.results = [];
    this.filters = [];
  }

  search() {    
    if (_.isFunction(this.search_)) {
      if (this.searchQuery.length === 0 && !this.allowEmptySearch) {
        this.results = [];
        return;
      }

      this.search_({ query: this.searchQuery })
        .then((response) => {
          if (!_.isUndefined(response)) {
            this.results = response.data;
          }
        })
    }
  }

  displayResults() {
    return (this.hasFocus || this._mouseOver) && this.results.length > 0;
  }

  focus() {
    this.hasFocus = true;
  }

  blur() {
    this.hasFocus = false;
  }

  mouseover() {
    this._mouseOver = true;
  }

  mouseleave() {
    this._mouseOver = false;
  }

  add(result) {
    if (_.indexOf(this.filters, result) === -1) {
      this.searchQuery = '';
      this.filters.push(result);
      this._callback();
    }
  }

  remove(result) {
    this.filters = _.without(this.filters, result);
    this._callback();
  }

  _callback() {
    if (_.isFunction(this.callback)) {
      this.callback({ filters: this.filters })
    }
  }

  getEntityName(name) {
    switch (name) {
      case 'RIG':
        return 'Rigs'
      case 'CLIENT':
        return 'Clients'
      case 'WELL':
        return 'Wells'
      case 'JOB_OBJECTIVE':
        return 'Job Objectives'
      case 'JOB_TYPE':
        return 'Job Type'
      default:
        return name;
    }
  }
}

angular.module('app')
  .controller('SearchController', SearchController);

})();

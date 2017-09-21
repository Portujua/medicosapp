;(() => {

class ETreeController {
  constructor($scope, ETreeService, $attrs, $timeout) {
    this.treeService = ETreeService;
    this.$timeout = $timeout;
    this.showFilter = false;
    this.$scope = $scope;

    /*
    * Type: Array
    * Default: Empty array
    * Directive attribute: data
    * Description: The data which will be displayed
    */
    this.data = $scope.data || [];

    /*
    * Type: String
    * Default: 'name'
    * Directive attribute: label-field
    * Description: The field that will be used as the row title
    */
    this.labelField = $scope.labelField || 'name';

    /*
    * Type: String
    * Default: 'description'
    * Directive attribute: description-field
    * Description: The field that will be used as the row description
    */
    this.descriptionField = $scope.descriptionField || 'description';

    /*
    * Type: String
    * Default: ''
    * Directive attribute: title
    * Description: The tree title
    */
    this.title = $scope.title || '';

    /*
    * Type: String
    * Default: 'children'
    * Directive attribute: children-field
    * Description: The field that will be used as the node childrens
    */
    this.childrenField = $scope.childrenField || 'children';

    /*
    * Type: String
    * Default: 'loaded'
    * Directive attribute: loaded-field
    * Description: The field that will check wether the current node has loaded his childrens
    */
    this.loadedField = $scope.loadedField || 'loaded';

    /*
    * Type: Function
    * Default: Not implemented message function
    * Directive attribute: toggle-fn
    *
    * @param node
    * Description: The node where the event fires
    *
    * Description: The function that will be called whenever the user clicks on the toggle button
    */
    this.toggleFn = _.isFunction($scope.toggleFn) ? $scope.toggleFn : null;

    /*
    * Type: Function
    * Default: Not implemented message function
    * Directive attribute: add-fn
    *
    * @param node
    * Description: The node where the event fires
    *
    * Description: The function that will be called whenever the user clicks on the add button
    */
    this.addFn = _.isFunction($scope.addFn) ? $scope.addFn : null;

    /*
    * Type: Function
    * Default: Not implemented message function
    * Directive attribute: remove-fn
    *
    * @param node
    * Description: The node where the event fires
    *
    * Description: The function that will be called whenever the user clicks on the remove button
    */
    this.removeFn = _.isFunction($scope.removeFn) ? $scope.removeFn : null;

    /*
    * Type: Function
    * Default: Not implemented message function
    * Directive attribute: click-fn
    *
    * @param node
    * Description: The node where the event fires
    *
    * Description: The function that will be called whenever the user clicks on a specific node
    */
    this.clickFn = _.isFunction($scope.clickFn) ? $scope.clickFn : null;

    /*
    * Type: Function
    * Default: Not implemented message function
    * Directive attribute: edit-fn
    *
    * @param node
    * Description: The node where the event fires
    *
    * Description: The function that will be called whenever the user clicks on the edit button
    */
    this.editFn = _.isFunction($scope.editFn) ? $scope.editFn : null;

    /*
    * Type: Boolean
    * Default: false
    * Directive attribute: hide-toggle
    * Description: Used to decide wether to display or hide the toggle button. Will hide even if a toggle function is passed
    */
    this.hideToggle = _.isBoolean($scope.hideToggle) ? $scope.hideToggle : false;

    /*
    * Type: Boolean
    * Default: false
    * Directive attribute: hide-add
    * Description: Used to decide wether to display or hide the add button. Will hide even if a add function is passed
    */
    this.hideAdd = _.isBoolean($scope.hideAdd) ? $scope.hideAdd : false;

    /*
    * Type: Boolean
    * Default: false
    * Directive attribute: hide-remove
    * Description: Used to decide wether to display or hide the remove button. Will hide even if a remove function is passed
    */
    this.hideRemove = _.isBoolean($scope.hideRemove) ? $scope.hideRemove : false;

    /*
    * Type: Boolean
    * Default: false
    * Directive attribute: hide-edit
    * Description: Used to decide wether to display or hide the edit button. Will hide even if a edit function is passed
    */
    this.hideEdit = _.isBoolean($scope.hideEdit) ? $scope.hideEdit : false;

    /*
    * Type: Promise
    * Default: null
    * Directive attribute: promise
    * Description: Used for cg-busy loading state. Needs to be set from outside
    */
    this.promise = $scope.promise;

    /*
    * Type: String
    * Default: ''
    * Directive attribute: title-class
    * Description: Classes that will be added to the title
    */
    this.titleClass = !_.isUndefined($scope.titleClass) ? $scope.titleClass : '';

    /*
    * Type: String
    * Default: ''
    * Directive attribute: label-class
    * Description: Classes that will be added to the row title
    */
    this.labelClass = !_.isUndefined($scope.labelClass) ? $scope.labelClass : '';

    /*
    * Type: String
    * Default: ''
    * Directive attribute: description-class
    * Description: Classes that will be added to the row description
    */
    this.descriptionClass = !_.isUndefined($scope.descriptionClass) ? $scope.descriptionClass : '';

    /*
    * Type: String
    * Default: ''
    * Directive attribute: add-btn-class
    * Description: Classes that will be added to the add button
    */
    this.addBtnClass = !_.isUndefined($scope.addBtnClass) ? $scope.addBtnClass : '';

    /*
    * Type: String
    * Default: ''
    * Directive attribute: remove-btn-class
    * Description: Classes that will be added to the remove button
    */
    this.removeBtnClass = !_.isUndefined($scope.removeBtnClass) ? $scope.removeBtnClass : '';

    /*
    * Type: String
    * Default: ''
    * Directive attribute: toggle-btn-class
    * Description: Classes that will be added to the toggle button
    */
    this.toggleBtnClass = !_.isUndefined($scope.toggleBtnClass) ? $scope.toggleBtnClass : '';

    /*
    * Type: String
    * Default: ''
    * Directive attribute: edit-btn-class
    * Description: Classes that will be added to the edit button
    */
    this.editBtnClass = !_.isUndefined($scope.editBtnClass) ? $scope.editBtnClass : '';

    /*
    * Type: Boolean
    * Default: true
    * Directive attribute: show-filter
    * Description: Used to decide wether to display or hide the filter button.
    */
    this.showFilter_ = _.isBoolean($scope.showFilter) ? $scope.showFilter : true;

    /*
    * Type: Boolean
    * Default: true
    * Directive attribute: show-reload
    * Description: Used to decide wether to display or hide the reload button.
    */
    this.showReload = _.isBoolean($scope.showReload) ? $scope.showReload : true;

    /*
    * Type: Function
    * Default: Not implemented message function
    * Directive attribute: reload-fn
    *
    * Description: The function that will be called whenever the user clicks on the reload button
    */
    this.reloadFn = _.isFunction($scope.reloadFn) ? $scope.reloadFn : null;
  }

  $onInit() {
  }

  _toggle(node, fn, param) {
    try {
      this.toggleFn({ node: node })
        .finally(() => {
          fn(param);
        })
    }
    catch (e) {
      console.warn('You should return a promise object in the toggle function.');
    }
  }

  _add(node) {
    try {
      this.addFn({ node: node })
        .finally(() => {
          this.$timeout(() => {
            delete this.filter;
            this.doFilter();
          }, 200);
        })
    }
    catch (e) {
      console.warn('You should return a promise object in the add function in order to auto-update results.');
    }
  }

  _remove(node) {
    try {
      this.removeFn({ node: node })
        .finally(() => {
          this.$timeout(() => {
            delete this.filter;
            this.doFilter();
          }, 100);
        })
    }
    catch (e) {
      console.warn('You should return a promise object in the remove function in order to auto-update results.');
    }
  }

  _click(node) {
    // if (_.isUndefined(this.lastClicked)) {
    //   this.lastClicked = node;
    // }
    // else if (this.lastClicked !== node) {
    // }
    this.clickFn({ node: node });
  }

  _edit(node) {
    try {
      this.editFn({ node: node })
        .finally(() => {
          this.$timeout(() => {
            delete this.filter;
            this.doFilter();
          }, 100);
        })
    }
    catch (e) {
      console.warn('You should return a promise object in the edit function in order to auto-update results.');
    }
  }

  _doFilter(data = this.$scope.data) {
    if (_.isUndefined(this.filter) || _.isEmpty(data)) {
      return;
    }

    if (this.filter.length === 0) {
      return;
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i][this.labelField].toUpperCase().indexOf(this.filter.toUpperCase()) > -1) {
        this.$scope.data_.push({
          id: data[i].id,
          [this.labelField]: data[i][this.labelField],
          [this.descriptionField]: data[i][this.descriptionField],
          [this.childrenField]: [],
          _ref: data[i]
        });
      }

      if (!_.isUndefined(data[i][this.childrenField]) && !_.isNull(data[i][this.childrenField]) && _.isArray(data[i][this.childrenField])) {
        if (data[i][this.childrenField].length > 0) {
            this._doFilter(data[i][this.childrenField]);
        }
      }
    }
  }

  doFilter() {
    this.$scope.data_ = [];
    this.isFiltered = false;

    this._doFilter(this.$scope.data);

    if (this.$scope.data_.length > 0) {
      this.isFiltered = true;
    }
    else {
      this.$scope.data_ = this.$scope.data;
    }
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }
}

angular.module('app')
  .controller('ETreeController', ETreeController);

})();

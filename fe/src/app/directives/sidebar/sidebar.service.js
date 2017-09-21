;(() => {

class SidebarService {
  constructor(SidebarOption) {
    this._options = [];
    this.SidebarOption = SidebarOption;
  }

  reset() {
    this._options = _.filter(this._options, (value) => {
      return value.isFixed;
    });

    return this; // For chaining
  }

  add(item) {
    // Create a new item
    let newItem = new this.SidebarOption(item);

    // Verify it isnt repeated
    if (newItem.fill(this._options)) {
      // If doesnt exist
      this._options.push(newItem);
      // Fix ids and positions
      this._update();
    } else {
      console.warn('There is a similar option in the list.');
    }
    return this; // For chaining
  }

  getById(id) {
    return _.findWhere(this._options, { id });
  }

  getByPosition(pos, type = 'option') {
    let out = _.sortBy(_.filter(this._options, (value) => value.type.toLowerCase() === type.toLowerCase()), (value) => value.order);
    return out[pos];
  }

  removeById(id) {
    let item = this.getById(id);

    if (!_.isEmpty(item)) {
      let index = _.indexOf(this._options, item);

      if (index >= 0) {
        this._options.splice(index, 1);
        // Update ids and positions
        this._update();
      }
    }
  }

  removeByPosition(pos, type = 'option') {
    let item = this.getByPosition(pos, type);

    if (!_.isEmpty(item)) {
      let index = _.indexOf(this._options, item);

      if (index >= 0) {
        this._options.splice(index, 1);
        // Update ids and positions
        this._update();
      }
    }
  }

  getOptions() {
    return _.sortBy(_.filter(this._options, (value) => value.type.toLowerCase() === 'option'), (value) => value.order);
  }

  getButtons() {
    return _.sortBy(_.filter(this._options, (value) => value.type.toLowerCase() !== 'option'), (value) => value.order);
  }

  _update() {
    _.each(this._options, (value, i) => {
      value._position = i;
      if (value._isDefaultId) {
        value.id = `item-${value._position}`;
      }
    });
  }
};

angular.module('app')
  .service('SidebarService', SidebarService);

})();

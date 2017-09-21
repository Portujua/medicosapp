angular.module('app')
  .factory('SidebarOption', (Auth, TabManagerService) => {

    class SidebarOption extends BaseFactory {

      constructor({ id = null, title = null, order = null, icon = null, callback = null, module = null, permission = null, isFixed = true, menu = [], collapsed = true, isDisabled = false, tab = { component: null }, color = 'color-0' }) {

        menu = _.map(menu, (value) => new SidebarOption(value));

        if (_.isEmpty(tab.id)) {
          tab.id = tab.component;
        }

        if (_.isEmpty(color) && !_.isEmpty(tab) && !_.isEmpty(tab.color)) {
          color = tab.color;
        }

        // Base
        super({ id, title, order, icon, callback, module, permission, isFixed, menu, isDisabled, tab, color });
      }

      fill(list) {
        if (!_.isArray(list)) {
          return false;
        }

        this._isDefaultId = false;

        if (_.isNull(this.order)) {
          this.order = list.length + 1;
        }

        // Setting the last position
        let last = _.last(list);
        this._position = list.length ? last._position + 1 : 0;

        // Unique ID
        if (_.isEmpty(this.id)) {
          this.id = `item-${this._position}`;
          this._isDefaultId = true;
        }

        // Verificamos si el id ya existe, de ser asi no se inserta
        if (_.findWhere(list, { id: this.id })) {
          console.warn(`There is a option with the same "id" in the list: "${this.id}"`);
          return false;
        }

        // Creating a fake id. to see if it was already added
        this._signature = angular.toJson({
          title: this.title,
          icon: this.icon,
          component: _.isEmpty(this.tab) ? null : this.tab.component,
        });

        let itExists = _.findWhere(list, { _signature: this._signature });

        return !itExists;
      }

      can() {
        if (_.isEmpty(this.module) && _.isEmpty(this.permission)) {
          return true;
        }
        return Auth.getSession().can(this.module, this.permission);
      }

      open() {
        TabManagerService.add({
          id: this.tab.id,
          title: this.tab.title || this.title,
          component: this.tab.component,
          icon: this.tab.icon,
          isPinned: this.tab.isPinned,
          order: this.tab.order,
          color: this.tab.color,
        });
      }
    };

    return SidebarOption;
  });

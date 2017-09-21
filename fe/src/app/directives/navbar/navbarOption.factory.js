angular.module('app')
  .factory('NavbarOption', (Auth) => {

    class NavbarOption extends BaseFactory {
      /**
       *        id: unique identifier (Default: "item-" + POSITION_IN_THE_LIST)
       *        name: name of the item
       *        order: the order of the item (int)
       *        icon
       *        [route]: where to go
       *        [callback]: what to do
       *        [type]: option|button|create
       *        [className]: btn-warning|btn-danger, etc.
       *        [module]
       *        [permission]
       *        isDisabled
       */
      constructor({ id = null, name = null, order = null, icon = null, route = null, callback = null, type = 'option', className = 'btn-primary', module = null, permission = null, promise = null, isDisabled = false, isFixed = true, subMenu = null, collapsed = true, color = null }) {
        let _subMenu = [];

        if (_.isArray(subMenu)) {
          for (let i = 0; i < subMenu.length; i++) {
            _subMenu.push(new NavbarOption(subMenu[i]));
          }

          subMenu = _subMenu;
        }

        // Base
        super({ id, name, order, icon, route, callback, type, className, module, permission, promise, isDisabled, isFixed, subMenu, color });

        // If there is a promise
        if (!_.isEmpty(this.promise)) {
          // Loading state
          this.isLoading = true;
          // When the promise finished
          this.promise.finally((response) => {
            this.promise = null;
            this.isLoading = false;
          });
        }
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
          name: this.name,
          icon: this.icon,
          route: this.route,
          className: this.className,
        });

        let itExists = _.findWhere(list, { _signature: this._signature });

        return !itExists;
      }

      enable() {
        this.isDisabled = false;
        return this;
      }

      disable() {
        this.isDisabled = true;
        return this;
      }

      can() {
        if (_.isEmpty(this.module) && _.isEmpty(this.permission)) {
          return true;
        }
        return Auth.getSession().can(this.module, this.permission);
      }

      setPromise(promise) {
        this.promise = promise;

        if (!_.isEmpty(this.promise)) {
          // Loading state
          this.isLoading = true;
          // When the promise finished
          this.promise.finally((response) => {
            this.promise = null;
            this.isLoading = false;
          });
        }
        return this;
      }
    };

    return NavbarOption;
  });

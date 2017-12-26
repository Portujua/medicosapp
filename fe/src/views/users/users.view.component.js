(() => {
  
  class UserViewController {
    constructor(Auth, User, UserService, LocationService, PromptService, PhoneService, TabManagerService) {
      this.Auth = Auth;
      this.User = User;
      this.UserService = UserService;
      this.LocationService = LocationService;
      this.PromptService = PromptService;
      this.PhoneService = PhoneService;
      this.UserService = UserService;
      this.TabManagerService = TabManagerService;
    }

    $onInit() {
      this.self = (/^(?!.*[0-9]).+$/).test(this.id);
      let id = this.self ? this.Auth.getSession().id : this.id;

      this.loadingPromise = this.UserService.get(id)
        .then((response) => {
          this.data = new this.User(response.data);
          this.load();
        })
    }

    load() {
      this.loadingPromise = this.LocationService.list().then((response) => {
        this.locations = response.data;

        return this.PhoneService.getTypes().then((response) => {
          this.phoneTypes = response.data;

          return this.PhoneService.list(this.data.id).then((response) => {
            this.data.phones = response.data;

            return this.UserService.listSuscriptions(this.data.id)
          })
        })
      })
    }

    save(data, field) {
      return this.UserService.update(this.data.id, this.data.putPayload(field, data), true)
        .then((response) => {
          response.data.token = this.data.token;
          this.Auth._setUser(response);
          this.data = new this.User(this.Auth.getSession());
        });
    }

    addPhone() {
      this.PromptService.open({
        title:'Nuevo teléfono',
        size: 'sm',
        confirmButtonText: 'Añadir',
        inputs: [
          {
            label: 'Número telefónico',
            placeholder: 'ej. 12345678',
            type: 'number',
            min: 0,
            map: 'tlf'
          }
        ],
        selects: [
          {
            label: 'Tipo',
            map: 'tipo',
            data: this.phoneTypes,
            nameField: 'nombre'
          }
        ]
      }).then((response) => {
        this.isSaving = true;
  
        this.loadingPromise = this.PhoneService.add(this.data.id, response)
            .then((response) => {
              this.load();
            }).finally(() => {
              this.isSaving = false;
            });
        });
    }

    deletePhone(id) {
      this.PhoneService.delete(id).then((response) => {
        this.load();
      })
    }

    openSuscriptions() {
      this.TabManagerService.add({ title: 'Suscripciones', component: 'suscriptionBList', color: 'color-1' })
    }
  }
  
  angular.module('app')
    .component('usersView', {
      templateUrl: 'views/users/users.view.html',
      controller: UserViewController,
      controllerAs: '$ctrl',
      bindings: {
        id: '@',
        tabId: '@',
      }
    });
  
  })();
  
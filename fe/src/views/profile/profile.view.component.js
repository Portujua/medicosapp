(() => {
  
  class ProfileViewController {
    constructor(Auth, User, ProfileService, LocationService, PromptService, PhoneService, UserService, TabManagerService) {
      this.data = new User(Auth.getSession());
      this.Auth = Auth;
      this.User = User;
      this.ProfileService = ProfileService;
      this.LocationService = LocationService;
      this.PromptService = PromptService;
      this.PhoneService = PhoneService;
      this.UserService = UserService;
      this.TabManagerService = TabManagerService;
    }

    $onInit() {
      this.load();
    }

    load() {
      this.loadingPromise = this.loadLocations() && this.loadPhoneTypes() && this.loadPhones();
    }

    loadLocations() {
      return this.LocationService.list().then((response) => {
        this.locations = response.data;
      })
    }

    loadPhoneTypes() {
      return this.PhoneService.getTypes().then((response) => {
        this.phoneTypes = response.data;
      })
    }

    loadPhones() {
      return this.PhoneService.list(this.data.id)
        .then((response) => {
          this.data.phones = response.data;
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
    .component('profileView', {
      templateUrl: 'views/profile/profile.view.html',
      controller: ProfileViewController,
      controllerAs: '$ctrl'
    });
  
  })();
  
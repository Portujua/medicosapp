(() => {
  
  class UserNewController {
    constructor(UserService, LocationService, PhoneService, User) {
      this.UserService = UserService;
      this.LocationService = LocationService;
      this.PhoneService = PhoneService;
      this.User = User;
    }

    $onInit() {
      this.type = this.resolve.type;
      let es_medico = this.type === 'medic' ? 1 : 0;
      this.data = new this.User({ es_medico });

      this.load();
    }

    load() {
      this.loadingPromise = this.loadLocations();
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

    save() {
      this.isSaving = true;
      
      this.loadingPromise = this.UserService.create(this.data.postPayload())
        .then((response) => {
          this.modalInstance.close(response.data);
        }).finally(() => {
          this.isSaving = false;
        });
    }
  
    cancel(){
      this.modalInstance.dismiss('cancel');
    }
  }
  
  angular.module('app')
    .component('usersNew', {
      templateUrl: 'views/users/users.new.html',
      controller: UserNewController,
      controllerAs: '$ctrl',
      bindings: {
        modalInstance: '<',
        resolve: '<',
      }
    });
  
  })();
  
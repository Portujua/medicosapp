;(() => {

class UsersNewController {
  constructor(UserService, User, RoleService) {
    this.UserService = UserService;
    this.User = User;
    this.RoleService = RoleService;
  }

  $onInit() {
    this.load();
  }

  load() {
    this.data = new this.User({});
    this.getRoles();
  }

  save() {
    this.isSaving = true;
    //this.data.profilePicture = this.pic.pay;
    
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

  getRoles() {
    this.loadingPromise = this.RoleService.getActives()
      .then((response) => {
        this.roles = response.data;
      });
  }
}

angular.module('app')
  .component('usersNew', {
    templateUrl: 'views/users/users.new.html',
    controller: UsersNewController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();

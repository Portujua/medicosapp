;(() => {

class UsersEditController {
  constructor(UserService, User, Auth, RoleService) {
    this.UserService = UserService;
    this.User = User;
    this.RoleService = RoleService;
    this.session = Auth.getSession();
  }

  $onInit() {
    this.data = new this.User({});
    this.loadingPromise = this.load() && this.getRoles();
  }

  load() {
    return this.UserService.get(this.resolve.id)
      .then((response) => {
        this.data = new this.User(response.data);
      });
  }

  getRoles() {
    return this.RoleService.getActives()
      .then((response) => {
        this.roles = response.data;
      });
  }

  toggleActivation() {
    this.UserService.toggleActivation(this.data.id, this.data.isActive)
      .then((response) => {

      }, (response) => {
        this.data.isActive = !this.data.isActive;
      });
  }

  ok() {
    this.isSaving = true;
    let payload = {
      newPassword : this.data.password
    }

    this.loadingPromise = this.UserService.changePassword( payload, this.data.id)
      .then((response) => {
       // Close the modal
       this.modalInstance.close(response.data);
      }).finally(() => {
        this.isSaving = false;
      });
  }



  cancel() {
    this.modalInstance.dismiss('cancel');
  }
}

angular.module('app')
  .component('usersEdit', {
    templateUrl: 'views/users/users.edit.html',
    controller: UsersEditController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();

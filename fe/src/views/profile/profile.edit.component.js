;(() => {

class ProfileEditController {
  constructor(ProfileService, Profile, Auth, PromptService, toastr) {
    this.ProfileService = ProfileService;
    this.Profile = Profile;
    this.session = Auth.getSession();
    this.PromptService = PromptService;
    this.toastr = toastr;
  }

  $onInit() {
    this.data = new this.Profile({});
    this.loadingPromise = this.load();
  }

  load() {
    return this.ProfileService.get('self')
      .then((response) => {
        this.data = new this.Profile(response.data);
      });
  }

  ok() {
    this.isSaving = true;

    this.loadingPromise = this.ProfileService.update(this.data.id, this.data.putPayload(), true)
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

  changePassword(){
    this.PromptService.open({
      title:'Change password',
      size: '30p',
      inputs: [
        {
          label: 'Old password',
          type: 'password',
          minlength: 8,
          maxlength: 20,
          map: 'oldPassword',
        },
        {
          label: 'New password',
          type: 'password',
          pattern: /((?=.*\d)|(?=.*\W+))(?=.*[!@#$%^&*])(?![.\n])(?=.*[a-z]).*$/,
          petternErrorMessage: 'Password must have at least a character.<br>Password must have at least a special character.',
          minlength: 8,
          maxlength: 20,
          map: 'newPassword',
        },
        {
          label: 'Confirm password',
          type: 'password',
          pattern: /((?=.*\d)|(?=.*\W+))(?=.*[!@#$%^&*])(?![.\n])(?=.*[a-z]).*$/,
          petternErrorMessage: 'Password must have at least a character.<br>Password must have at least a special character.',
          minlength: 8,
          maxlength: 20,
          map: 'confirmPassword',
          compareTo: 1,
        }
      ]
    }).then((response) => {
        let obj = {
          newPassword: response.newPassword,
          oldPassword: response.oldPassword
        };

        this.isSaving = true;

        this.loadingPromise = this.ProfileService.changePassword(obj)
          .then((response) => {
           // Close the modal
           this.modalInstance.close(response.data);
          }).finally(() => {
            this.isSaving = false;
          });
      });
  }
}

angular.module('app')
  .component('profileEdit', {
    templateUrl: 'views/profile/profile.edit.html',
    controller: ProfileEditController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();

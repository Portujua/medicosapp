;(() => {

class Message {
  constructor(toastr) {
    this.toastr = toastr;
  }

  show(text = 'Something wrong just happend.') {
    this.toastr.success(text);
  }

  create(entity = 'element') {
    this.show(`The <b>"${entity}"</b> was created successfully.`);
  }

  update(entity = 'element') {
    this.show(`The <b>"${entity}"</b> was updated successfully.`);
  }

  delete(entity = 'element') {
    this.show(`The <b>"${entity}"</b> was deleted successfully.`);
  }

  toggle() {
    this.show('The state was changed successfully.');
  }
};

angular.module('app')
  .service('Message', Message);

})();

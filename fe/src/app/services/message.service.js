;(() => {

class Message {
  constructor(toastr) {
    this.toastr = toastr;
  }

  show(text = 'Something wrong just happend.') {
    this.toastr.success(text);
  }

  error(text = 'Something wrong just happend.') {
    this.toastr.error(text);
  }

  create(entity = 'element') {
    this.show(`<b>"${entity}"</b> ha sido creado con éxito.`);
  }

  update(entity = 'element') {
    this.show(`<b>"${entity}"</b> ha sido actualizado con éxito.`);
  }

  delete(entity = 'element') {
    this.show(`<b>"${entity}"</b> ha sido eliminado con éxito.`);
  }

  toggle() {
    this.show('The state was changed successfully.');
  }
};

angular.module('app')
  .service('Message', Message);

})();

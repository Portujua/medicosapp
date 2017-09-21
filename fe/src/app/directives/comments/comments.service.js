;(() => {

class CommentsService {
  constructor($uibModal, RESTful) {
    this.$uibModal = $uibModal;
    this.RESTful = RESTful;
  }

  open(id) {
    if (_.isEmpty(id)) {
      return;
    }

    this._isRefreshing = true;

    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'commentsModal',
      keyboard: false,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'md',
      resolve: {
        id: () => id,
      }
    });

    return modalInstance.result;
  }

  isRefreshing() {
    return this._isRefreshing;
  }

  disableRefreshing() {
    this._isRefreshing = false;
  }

  comment(id, text){
    if (_.isEmpty(id)) {
      return;
    }

    return this.RESTful.post(`comments/${id}`, {
      recordId: this.id,
      text
    });
  }

  getCounter(id){
    return this.RESTful.get(`comments/${id}/count`);
  }

  load(id, query) {
    let params = angular.copy(query);

    // Calculating actual page
    if (!_.isUndefined(params.page)) {
      params.page--;
    }

    if (_.isEmpty(id)) {
      return;
    }

    return this.RESTful.get(`comments/${id}`, params);
  }

  typeaheadUsers(keyword) {
    return this.RESTful.get('users', { keyword, simple: true })
  }
};

angular.module('app')
  .service('CommentsService', CommentsService); 

})();

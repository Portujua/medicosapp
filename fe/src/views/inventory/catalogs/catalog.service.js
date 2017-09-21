;(() => {

class CatalogService extends BaseService {
  constructor(RESTful, Message, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
  }

  list(query) {
    query.expand = _.isString(query.expand) ? query.expand : this.getExpand('catalogs', 'list', 'inventory/catalogs');
    let params = this.getQueryString(query);

    return this.RESTful.get('catalog-entries', params);
  }

  get(id, expand = this.getExpand('catalogs', 'view', 'inventory/catalogs')) {
    return this.RESTful.get(`catalog-entries/${id}`, { expand });
  }

  getDetails(id) {
    return this.RESTful.get(`catalog-entries/${id}/details`);
  }

  getEntryCategories(id) {
    return this.RESTful.get(`catalog-entries/${id}/categories`);
  }

  create(payload) {
    return this.RESTful.post('catalog-entries', payload)
      .then((response) => {
        this.Message.create('catalog entry');
        return response;
      });
  }

  getImages() {
    return this.RESTful.get('catalog-entries/images')
      .then((response) => {
        return { data: _.sortBy(response.data, (value) => value.baseCompoment) };
      });
  }

  createManufacturer(itemValue) {
    return this.RESTful.post('manufacturers', { itemValue })
      .then((response) => {
        this.Message.create('manufacturer');
        return response;
      });
  }

  getManufacturers(keyword) {
    return this.RESTful.get('manufacturers', { keyword, active: true, simple: true });
  }

  update(id, payload, inPlace = false) {
    let promise = inPlace
      ? this.RESTful.patch(`catalog-entries/${id}`, payload)
      : this.RESTful.put('catalog-entries', payload);

    return promise.then((response) => {
        this.Message.update('catalog entry');
        return response;
      });
  }

  openCreateModal() {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'catalogsNew',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'compose-md',
      resolve: { }
    });

    return modalInstance.result;
  }

  openUpdateModal(id) {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'catalogsEdit',
      keyboard: true,
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

  // Categories
  //
  getCategories(keyword) {
    return this.RESTful.get('catalog-categories', { keyword, simple: true, active: true });
  }

  getParentCategories() {
    return this.RESTful.get('catalog-categories', { parents: true });
  }

  getSubCategories(parentId) {
    return this.RESTful.get(`catalog-categories/${parentId}`, { children: true });
  }

  createCategory(payload) {
    return this.RESTful.post('catalog-categories', payload)
      .then((response) => {
        this.Message.create('catalog category');
        return response;
      });
  }

  updateCategory(payload) {
    return this.RESTful.put('catalog-categories', payload)
      .then((response) => {
        this.Message.update('catalog category');
        return response;
      });
  }

  deleteCategory(categoryId) {
    return this.RESTful.delete(`catalog-categories/${categoryId}`)
      .then((response) => {
        this.Message.delete('catalog category');
        return response;
      });
  }

  openCreateCategoryModal() {
    let modalInstance = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'catalogCategoriesList',
      keyboard: true,
      // Indicates whether the dialog should be closable by hitting the ESC key.
      backdrop: 'static',
      // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
      size: 'compose-md',
      resolve: { }
    });

    return modalInstance.result;
  }
};

angular.module('app')
  .service('CatalogService', CatalogService);

})();

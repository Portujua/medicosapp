;(() => {

class CatalogCategoriesListController {
  constructor(Auth, CatalogService, CatalogCategory, PromptService) {
    this.session = Auth.getSession();
    this.CatalogService  = CatalogService;
    this.CatalogCategory = CatalogCategory;
    this.PromptService = PromptService;

  }

  $onInit() {
    this.load();
  }

  load() {
    this.loadingPromise = this.CatalogService.getParentCategories()
      .then((response) => {
        this.data = response.data.content;
      });
  }

  loadChildrens(node, ref = null) {
    if (node.loaded) {
      return;
    }

    node.loaded = true;
    this.isLoading = true;

    return this.loadingPromise = this.CatalogService.getSubCategories(node.id)
      .then((response) => {
        this.isLoading = false;

        if (_.isEmpty(ref)) {
          node.children = response.data;
        }
        else {
          ref.children = response.data;
        }
      });
  }

  add(node) {
    this.PromptService.open({
      title: `New ${_.isEmpty(node) ? '' : 'sub-' }category`,
      size: 'sm',
      confirmButtonText: 'Add',
      inputs: [
        {
          label: 'Name',
          map: 'name',
          maxlength: 50,
        },
        {
          label: 'Description',
          map: 'description',
          type: 'textarea',
          maxlength: 250,
        }
      ]
    }).then((response) => {
      let data = new this.CatalogCategory({
        name: response.name,
        description: response.description,
        parent: node,
      });

      this.loadingPromise = this.CatalogService.createCategory(data.postPayload())
        .then((response) => {
          _.isEmpty(node) ? this.load() : this.loadChildrens(node, node);
        });
    });
  }

  update(node) {
    let parent = this.getParent(node.id);
    console.log(parent);

    this.PromptService.open({
      title: `Edit ${_.isEmpty(node) ? '' : 'sub-' }category`,
      size: 'sm',
      confirmButtonText: 'Save',
      inputs: [
        {
          label: 'Name',
          map: 'name',
          maxlength: 50,
          value: node.name,
        },
        {
          label: 'Description',
          map: 'description',
          type: 'textarea',
          maxlength: 250,
          value: node.description,
        }
      ]
    }).then((response) => {
      let data = new this.CatalogCategory({
        id: node.id,
        name: response.name,
        description: response.description,
        parent: node,
      });

      this.loadingPromise = this.CatalogService.updateCategory(data.putPayload())
        .then((response) => {
          if (_.isEmpty(parent) || parent.id === node.id) {
            this.load();
          } else {
            parent.loaded = false;
            this.loadChildrens(parent);
          }
        });
    });
  }

  getParent(id, data = this.data, parent = null, last = false) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        if (!last) {
          if (this.data === data) {
            return data[i];
          }
          else {
            return this.getParent(parent, this.data, null, true);
          }
        }
        else {
          return data[i];
        }
      }
      else if (!_.isNull(data[i].children)) {
        return this.getParent(id, data[i].children, data[i].id, last);
      }
    }
  }

  delete(node) {
    this.loadingPromise = this.CatalogService.deleteCategory(node.id)
      .then((response) => {
        this.load();
      })
  }

  cancel() {
    this.modalInstance.dismiss('cancel');
  }
}

angular.module('app')
  .component('catalogCategoriesList', {
    templateUrl: 'views/inventory/catalogs/catalogCategories.list.html',
    controller: CatalogCategoriesListController,
    bindings: {
      modalInstance: '<',
      resolve: '<',
    }
  });

})();

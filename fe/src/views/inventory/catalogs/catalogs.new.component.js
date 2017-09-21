;(() => {

class CatalogsNewController {
  constructor(Auth, CatalogService, Catalog, BhaComponent, DrillBit, Motor, WaterPump) {
    this.session = Auth.getSession();
    this.CatalogService = CatalogService;
    this.Catalog = Catalog;
    this.BhaComponent = BhaComponent;
    this.DrillBit = DrillBit;
    this.Motor = Motor;
    this.WaterPump = WaterPump;

    this.baseComponents = [
      { title: 'BHA Component', value: 'BHACOMPONENT' },
      { title: 'Drill Bit', value: 'BIT' },
      { title: 'Motor', value: 'MOTOR' },
      { title: 'Water Pump', value: 'WATERPUMP' }
    ];
  }

  $onInit() {
    this.entry = new this.Catalog({});
    this.detail = new this.BhaComponent({});

    // Parent categories
    this.getCategories();

    // Get images
    this.getImages();
  }

  getCategories(query) {
    return this.CatalogService.getCategories(query)
      .then((response) => {
        return response.data;
      });
  }

  typeChange() {
    switch (this.entry.itemType) {
      case 'BHACOMPONENT':
        this.detail = new this.BhaComponent(this.detail.getObject());
        break;
      case 'BIT':
        this.detail = new this.DrillBit(this.detail.getObject());
        break;
      case 'MOTOR':
        this.detail = new this.Motor(this.detail.getObject());
        break;
      case 'WATERPUMP':
        this.detail = new this.WaterPump(this.detail.getObject());
        break;
    };
  }

  copy(field) {
    this.detail[field] = this.entry[field];
  }

  getImages() {
    this.loadingPromise = this.CatalogService.getImages()
      .then((response) => {
        this.images = _.map(_.sortBy(response.data), (item) => {
          return {
            title: item.baseCompoment.replace(/_/g, ' '),
            value: item.baseCompoment,
          };
        });
      }, (response) => { });
  }

  getManufacturers(keyword) {
    return this.CatalogService.getManufacturers(keyword)
      .then((response) => {
        return response.data;
      });
  }

  createManufacturer() {
    this.CatalogService.createManufacturer(this.entry.manufacturer)
      .then((response) => {
        // Set the new value to the model
        this.entry.manufacturer = response.data;
      });
  }

  save() {
    this.isSaving = true;

    this.loadingPromise = this.CatalogService.create(this.entry.postPayload(this.detail.postPayload()))
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

  validatePicklists() {
    return (this.entry.manufacturer && !this.entry.manufacturer.id);
  }
}

angular.module('app')
  .component('catalogsNew', {
    templateUrl: 'views/inventory/catalogs/catalogs.new.html',
    controller: CatalogsNewController,
    bindings: {
      modalInstance: '<',
    }
  });

})();

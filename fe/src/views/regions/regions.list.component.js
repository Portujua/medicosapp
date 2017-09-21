;(() => {

class RegionsListController {
  constructor(RegionService, Region, Auth, PromptService) {
    this.RegionService = RegionService;
    this.Region = Region;
    this.session = Auth.getSession();
    this.PromptService = PromptService;

    this.data = [];
  }

  $onInit(){
    this.load();
  }

  load() {
    this.isLoading = true;

    this.loadingPromise = this.RegionService.list().then((response) => {
      this.isLoading = false;
      this.data = response.data;
    })
  }

  create() {
    this.RegionService.openCreateModal()
      .then((response) => {
         this.load();
      });
  }

  update(node) {
    let parent = this.getParent(node.id);

    return this.RegionService.openUpdateModal(node.id)
      .then((response) => {
        if (parent.id === node.id) {
          this.load();
        }
        else {
          this.loadChildrens({ id: parent.id }, parent);
        }
      });
  }

  delete(node) {
    let parent = this.getParent(node.id);

    return this.RegionService.delete(node.id)
      .then((response) => {
        if (parent.id === node.id) {
          this.load();
        }
        else {
          this.loadChildrens({ id: parent.id }, parent);
        }
      });
  }

  toggleActivation(item) {
    this.loadingPromise = this.RegionService.toggleActivation(item.id, item.isActive)
      .then((response) => {

      }, (response) => {
        item.isActive = !item.isActive;
      });
  }

  add(obj){
    return this.PromptService.open({
        title: `${obj.name}\'s new child`,
        size: 'sm',
        confirmButtonText: 'Add',
        inputs: [
          {
            label: 'Name'
          }
        ]
      }).then((response) => {
        this.RegionService.add({ name: response, parent: { id: obj.id, name: obj.name } })
          .then((response) => {
            this.loadChildrens({ id: obj.id }, !_.isUndefined(obj._ref) ? obj._ref : obj);
          });
      })
  }

  loadChildrens(obj, ref = null){
    
    if (obj.loadedData){
       return;
    }
     

    obj.loadedData = true;
    this.isLoading = true;

    return this.loadingPromise = this.RegionService.getChilds(obj.id)
      .then((response) => {
        this.isLoading = false;

        if (_.isNull(ref)) {
           obj.children = response.data;
         }     
        else {
          ref.children = response.data;
        }
          
      })
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
}

angular.module('app')
  .component('regionsList', {
    templateUrl: 'views/regions/regions.list.html',
    controller: RegionsListController,
    controllerAs: '$ctrl'
  });

})();

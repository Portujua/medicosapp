;(() => {

class MudListController {
  constructor(MudService, Mud, NgTableParams, Auth, DateUtil) {
    this.session = Auth.getSession();
    this.MudService = MudService;
    this.Mud = Mud;
    this.NgTableParams = NgTableParams;
    this.DateUtil = DateUtil;
  }

  $onChanges(changes) {
    if (_.isEmpty(this.job) || _.isEmpty(this.day)) {
      return;
    }
    // When we have a job and a day
    this.load();
  }

  $onInit () {

  }

  load() {
  
    this.isLoading = true;

    this.tableParams = new this.NgTableParams({ }, {
      getData: (params) => {
        this.count = params.count() * (params.page() - 1);

        // Query strings
        let query = {
          sort: params.orderBy(),
          page: params.page(),
          size: params.count(),
          filter: _.extend(params.filter(), { checkedAt: this.DateUtil.convertDatesToStrings(this.day.date) }),
        };

        return this.loadingPromise = this.MudService.list(query, this.job.id)
          .then((response) => {


            // Setting the total of records
            params.total(response.data.totalElements);
            // Finally
            this.isLoading = false;
            // returning list
          
            return response.data.content;
          });
      }
    });
  }

  createMud() {
    this.MudService.openCreateModal(this.job.id, this.day.date)
      .then((response) => {
        this.load();
      }, () => { });
  }

  save(data, field, item) {
   let obj = new this.Mud(item);

   return this.MudService.update(obj.id, obj.putPayload(field, data), true)
     .then ((response) =>  {

     }, (response) => {
       return '';
     });
  }

  getMudTypes() {
    this.MudService.getMudTypes()
      .then((response) => {
        this.mudTypes = response.data;
      });
  }
}

angular.module('app')
  .component('mudsList', {
    templateUrl: 'views/muds/muds.list.html',
    controller: MudListController,
    bindings: {
      job: '<?',
      day: '<?',
    }
  });

})();

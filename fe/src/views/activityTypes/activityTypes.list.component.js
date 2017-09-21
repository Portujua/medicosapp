;(() => {

class ActivityTypesListController {
  constructor(ActivityTypeService, ActivityType, Auth, NgTableParams, PromptService) {
    this.ActivityTypeService = ActivityTypeService;
    this.ActivityType = ActivityType;
    this.session = Auth.getSession();
    this.NgTableParams = NgTableParams;
    this.PromptService = PromptService;
    console.log(this.session.printPermissions());
  }

  $onInit() {
    this.load();
  }

  load() {
    this.tableParams = new this.NgTableParams({ sorting: { name: 'asc' } }, {
      getData: (params) => {
        this.count = params.count() * (params.page() - 1);

        // Query strings
        let query = {
          sort: params.orderBy(),
          page: params.page(),
          size: params.count(),
          filter: params.filter(),
        };

        return this.loadingPromise = this.ActivityTypeService.list(query)
          .then((response) => {
            // Setting the total of records
            params.total(response.data.totalElements);
            // returning list


            return response.data.content;
          });
      }
    });
  }

  create() {
    this.ActivityTypeService.openCreateModal()
      .then((response) => {
        this.load();
      }, () => { });
  }

  update(id) {
    this.ActivityTypeService.openUpdateModal(id)
      .finally(() => {
        this.load();
      });
  }

  save(data, field, item) {
    let obj = new this.ActivityType(item);
    return this.ActivityTypeService.update(obj.id, obj.putPayload(field, data), true)
      .then((response) => {

      }, (response) => {
        return '';
      });
  }

  toggle(data, field, item) {
    if (!this.session.can('activity_type', 'edit')) {
      return;
    }
    this.save(!data, field, item)
      .then((response) => {
        item[field] = !data;
      });
  }

}

angular.module('app')
  .component('activityTypesList', {
    templateUrl: 'views/activityTypes/activityTypes.list.html',
    controller: ActivityTypesListController,
  });

})();

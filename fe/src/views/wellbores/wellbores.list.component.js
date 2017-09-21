;(() => {

	class WellboresListController {
		constructor(WellboreService, Wellbore, Auth, NgTableParams, PromptService) {
			this.WellboreService = WellboreService;
			this.Wellbore = Wellbore;
      this.session = Auth.getSession();
      this.NgTableParams = NgTableParams;
      this.PromptService = PromptService;
		}

		$onInit() {

		}

    $onChanges() {
      if (!_.isEmpty(this.id)) {
        // If the id isnt empty we must load our data
        this.load();
      }
    }

		load() {
			this.tableParams = new this.NgTableParams({ }, {
				getData: (params) => {
					this.count = params.count() * (params.page() - 1);

					// Query strings
					let query = {
            sort: params.orderBy(),
            page: params.page(),
            size: params.count(),
            filter: params.filter(),
          };

					return this.loadingPromise = this.WellboreService.list(query, this.id)
  					.then((response) => {
              this.wellbores = response.data.content;
  						// Setting the total of records
              params.total(response.data.totalElements);
              // returning list
              return response.data.content;
  					});
				}
			});
		}

		create() {
			this.WellboreService.openCreateModal(this.id)
  			.then((response) => {
  				this.load();
  			}, () => { });
		}

  //   update(id) {
  //     this.WellboreService.openUpdateModal(id)
  //     .then((response) => {
  //       this.load();
  //     }, () => { });
  //   }

		// createWellboreShape() {
		// 	this.PromptService.open({
  //       title: 'New Wellbore Shape',
  //       confirmButtonText: 'Create',
  //       size: 'sm',
  //       keyboard: true,
  //       backdrop: true,
  //       inputs: [
  //         {
  //           label: 'Wellbore Shape',
  //           placeholder: 'Enter a value...',
  //           maxlength: 50,
  //         }
  //       ]
  //     }).then((response) => {
  //       return this.WellboreService.createWellboreShape(response);
  //     });
		// }

		// createTargetFormation() {
		// 	this.PromptService.open({
  //       title: 'New Target Formation',
  //       confirmButtonText: 'Create',
  //       size: 'sm',
  //       keyboard: true,
  //       backdrop: true,
  //       inputs: [
  //         {
  //           label: 'Target Formation',
  //           placeholder: 'Enter a value...',
  //           maxlength: 50,
  //         }
  //       ]
  //     }).then((response) => {
  //       return this.WellboreService.createTargetFormation(response);
  //     })
		// }

		// save(data, field, item) {
		// 	let obj = new this.Wellbore(item);

		// 	return this.WellboreService.update(obj.id, obj.putPayload(field, data), true)
  // 			.then ((response) =>  {

  // 			}, (response) => {
  // 				return '';
  // 			});
		// }

  //   updateParentWellbore(data, item) {
  //     let obj = new this.Wellbore(item);
  //     obj.parentWellbore = data;

  //     return this.WellboreService.update(obj.id, obj.putPayload())
  //       .then ((response) =>  {

  //       }, (response) => {
  //         return '';
  //       });
  //   }

  //   getWellbores(wellbore) {
  //     if (_.isEmpty(this.wellbores)) {
  //       return [];
  //     }
  //     return _.filter(this.wellbores, (value) => value.id !== wellbore.id);
  //   }

		// getWellboreShapes() {
		// 	this.WellboreService.getWellboreShapes()
  // 			.then((response) => {
  // 				this.wellboreShapes = response.data;
  // 			});
		// }

		// getTargetFormations() {
		// 	this.WellboreService.getTargetFormations()
  // 			.then((response) => {
  // 				this.targetFormations = response.data;
  // 			});
		// }
	}

	angular.module('app')
	.component('wellboresList', {
		templateUrl: 'views/wellbores/wellbores.list.html',
		controller: WellboresListController,
    bindings: {
      id: '@',
      job: '<?',
      well: '<?',
    }
	});

})();

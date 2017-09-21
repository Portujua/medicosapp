;(() => {

	class WellboreService extends BaseService {
		constructor(RESTful, Message, $uibModal, PromptService) {
      super();
			this.RESTful = RESTful;
			this.Message = Message;
			this.$uibModal = $uibModal;
      this.PromptService = PromptService;
		}

		list(query, wellId) {
      query.expand = _.isString(query.expand) ? query.expand : this.getExpand('wellbores', 'list');
      let params = this.getQueryString(query);

			return this.RESTful.get(`wells/${wellId}/wellbores`, params);
		}

    get(id, expand = this.getExpand('wellbores', 'view')) {
      return this.RESTful.get(`wells/wellbores/${id}`, { expand });
    }

    create(payload) {      
      return this.RESTful.post('wells/wellbores', payload)
        .then((response) => {
          this.Message.create('wellbore');
          return response;
        });
    }

    update(id, payload, inPlace = false) {
      let promise = inPlace
        ? this.RESTful.patch(`wells/wellbores/${id}`, payload)
        : this.RESTful.put('wells/wellbores', payload);

      return promise.then((response) => {
          this.Message.update('wellbore');
          return response;
        });
    }

    getWellboreShapes(keyword) {
      return this.RESTful.get('wells/wellbores/shapes', { keyword, active: true, simple: true });
    }

    createWellboreShape(itemValue) {
      return this.RESTful.post('wells/wellbores/shapes', { itemValue })
        .then((response) => {
          this.Message.create('wellbore shape');
          return response;
        });
    }

    getTargetFormations(keyword) {
      return this.RESTful.get('formations', { keyword, active: true, simple: true });
    }

    createTargetFormation(itemValue) {
      return this.RESTful.post('formations', { itemValue })
        .then((response) => {
          this.Message.create('target formation');
          return response
        });
    }

    openUpdateModal(wellboreId) {
      let modalInstance = this.$uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        component: 'wellboresEdit',
        keyboard: true,
        backdrop: 'static',
        size: 'md',
        resolve: {
          wellboreId: () => wellboreId,
        }
      });

      return modalInstance.result;
    }

    openCreateModal(wellId) {
      let modalInstance = this.$uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        component: 'wellboresNew',
        keyboard: true,
        backdrop: false,
        size: 'compose-md',
        resolve: {
          wellId: () => wellId,
        }
      })

      return modalInstance.result;
    }
	}

	angular.module('app')
  	.service('WellboreService', WellboreService);

})();

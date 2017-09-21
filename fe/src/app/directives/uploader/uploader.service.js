;(() => {

class UploaderService {
	constructor($uibModal, RESTful, Message, File) {
		this.$uibModal = $uibModal;
		this.RESTful = RESTful;
		this.Message = Message;
		this.File = File;
	}

	//id = entity id
	getDocuments(id) {
		let files = [];
		return this.RESTful.get(`attachments/${id}`)
  		.then((response) => {
  			_.each(response.data, (file) => {
  				let aux = new this.File(file);
  				files.push(aux);
  			});

        response.data = _.sortBy(files, (value) => value.createdAt).reverse();

  			return response;
  		});
	}

	//file = file data, id = entity id, type = file extension
	upload(payload, id) {
		return this.RESTful.post(`attachments/${id}`, payload)
  		.then((response) => {
  			this.Message.show('File uploaded successfully.');
  			return response;
  		});
	}

	open(id) {
		let modalInstance = this.$uibModal.open	({
			arialLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			component: 'UploaderController',
			keyboard: true,
			// Indicates whether the dialog should be closable by hitting the ESC key.
			backdrop: 'static',
			// Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
			size: 'lg',
			resolve: {
				id: () => id,
			}
		});

		return modalInstance.result;
	}

	listTags(query) {
		return this.RESTful.get(`attachments/tags/${query}`);
	}

	getCounter(id) {
		return this.RESTful.get(`attachments/${id}/count`);
	}


	update(payload, id, inPlace = false){
		return this.RESTful.put(`attachments/${id}`, payload, { inPlace })
  		.then((response) => {
  			this.Message.update('attachment');
  			return response;
  		});
	}
};

angular.module('app')
  .service('UploaderService', UploaderService);

})();


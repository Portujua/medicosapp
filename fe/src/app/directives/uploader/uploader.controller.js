;(() => {

	class UploaderController {
		constructor(UploaderService, File) {
			this.UploaderService = UploaderService;
			this.File = File;
			this.files = [];
			this.tags = [];
      this.search = {
        text: undefined,
        folder: undefined,
      };
      this.count = 0;
		}

		$onInit() {
			this.loadingPromise = this.load();
		}

		load() {
			this.loadingPromise = this.UploaderService.getDocuments(this.resolve.id)
  			.then((response) => {
  				this.files = response.data;
          this.getFolders();
  			});
		}

    getFolders() {
      let groups = _.groupBy(this.files, (value) => _.isEmpty(value.tag) ? null : value.tag.toLowerCase());
      this.folders = [];

      _.each(groups, (value, key) => {
        this.folders.push({
          tag: key === 'null' ? null : key,
          count: _.size(value),
        });
      });
    }

		cancel() {
			this.modalInstance.close(this.count);
		};

		upload(file) {
			this.isUploading = true;
			let extension= file.type.split('/');
			let doc = this.image.split(',');
			let filen = file.name.split('.');
			this.payload = {
				fileDTO:{
					content: doc[1],
					fileName: filen[0],
					fileExtension: filen[1]
				},
				tag: this.tag ?  this.tag : ' '
			};

		  this.loadingPromise = this.UploaderService.upload(this.payload, this.resolve.id)
  			.then ((response) => {
  				this.count++;
  				this.tag = null;
          this.load();
  			})
  			.finally(() => {
  				this.isUploading = false;
  			});
		};

		loadTags(query) {
			if (_.isEmpty(query)) {
				return;
			}

			return this.UploaderService.listTags(query)
			 .then((response) => {
			 		this.respuesta = response.data;
			 		return response.data;
			 });
		}

		save(data, field, id) {
		 	let aux = new this.File({});

		  this.UploaderService.update(aux.putPayload(field, data), id, true)
	      .then((response) => {
          this.getFolders();
	      }, (response) => {
	        return '';
	      });
  	}
	}

	angular.module('app')
	.component('uploaderController', {
		templateUrl: 'app/directives/uploader/uploader.html',
		controller: UploaderController,
	 	bindings: {
		 	modalInstance: '<',
		 	resolve: '<',
	 	}
 	});

})();


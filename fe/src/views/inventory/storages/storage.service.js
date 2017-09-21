;(() => {

class StorageSevice extends BaseService {
  constructor(RESTful, Message, $uibModal) {
    super();
    this.RESTful = RESTful;
    this.Message = Message;
    this.$uibModal = $uibModal;
  }

  // Storage
  //
  listStorage(query) {
    let params = this.getQueryString(query);

    return this.RESTful.get('storage', params);
  }

  createStorage(payload) {
    return this.RESTful.post('storage', payload)
      .then((response) => {
        this.Message.create('storage');
        return response;
      });
  }

  updateStorage(id, payload, inPlace = false) {
    let promise = inPlace
      ? this.RESTful.patch(`storage/${id}`, payload)
      : this.RESTful.put('storage', payload);

    return promise.then((response) => {
        this.Message.update('storage');
        return response;
      });
  }

  // Sector
  //
  listSector(query, storageId) {
    let params = this.getQueryString(query);

    return this.RESTful.get(`storage/${storageId}/sectors`, params);
  }

  createSector(payload) {
    return this.RESTful.post('sectors', payload)
      .then((response) => {
        this.Message.create('sector');
        return response;
      });
  }

  updateSector(id, payload, inPlace = false) {
    let promise = inPlace
      ? this.RESTful.patch(`sectors/${id}`, payload)
      : this.RESTful.put('sectors', payload);

    return promise.then((response) => {
        this.Message.update('sector');
        return response;
      });
  }


  // Rack
  //
  listRack(query, sectorId) {
    let params = this.getQueryString(query);

    return this.RESTful.get(`sectors/${sectorId}/racks`, params);
  }

  createRack(payload) {
    return this.RESTful.post('racks', payload)
      .then((response) => {
        this.Message.create('rack');
        return response;
      });
  }

  updateRack(id, payload, inPlace = false) {
    let promise = inPlace
      ? this.RESTful.patch(`racks/${id}`, payload)
      : this.RESTful.put('racks', payload);

    return promise.then((response) => {
        this.Message.update('rack');
        return response;
      });
  }


  // Shelf
  //
  listShelf(query, rackId) {
    let params = this.getQueryString(query);

    return this.RESTful.get(`racks/${rackId}/shelves`, params);
  }

  createShelf(payload) {
    return this.RESTful.post('shelves', payload)
      .then((response) => {
        this.Message.create('shelf');
        return response;
      });
  }

  updateShelf(id, payload, inPlace = false) {
    let promise = inPlace
      ? this.RESTful.patch(`shelves/${id}`, payload)
      : this.RESTful.put('shelves', payload);

    return promise.then((response) => {
        this.Message.update('shelf');
        return response;
      });
  }
};

angular.module('app')
  .service('StorageSevice', StorageSevice);

})();

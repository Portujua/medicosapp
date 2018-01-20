(() => {
  
  class MercadoPago {
    constructor(RESTful) {
      this.RESTful = RESTful;
    }

    set API_INFO(API_INFO) { this._API_INFO = API_INFO }

    get API_INFO() {
      if (_.isUndefined(this._API_INFO)) {
        throw 'API info is not ready.';
        return;
      }

      return this._API_INFO;
    }
  
    loadApiInfo() {
      this.RESTful.get('mercadopago/api_info').then((response) => {
        this._API_INFO = response.data;
      })
    }

    summary() {
      return this.RESTful.get('mercadopago/summary')
    }
  };
  
  angular.module('app')
    .service('MercadoPago', MercadoPago);
  
  })();
  
angular.module('app')
  .factory('ClientContract', () => {

    class ClientContract extends BaseFactory {
      constructor({ id = null, client = null, contract = null, startDate = null, endDate = null, isActive = null, terms = [] }) {
        super({ id, client, contract, startDate, endDate, isActive, terms });
      }

      postPayload() {
        return {
          client: this.simplify(this.client),
          contract: this.simplify(this.contract),
          startDate: this.startDate,
          endDate: this.endDate,
          terms: this.terms
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            startDate: this.startDate,
            endDate: this.endDate,
            isActive: this.isActive,
            terms: this.terms
          };
        }

        // Edit In-place update
        return {
          [field]: value,
        };
      }
    };

    return ClientContract;
  });

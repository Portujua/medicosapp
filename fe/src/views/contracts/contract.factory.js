angular.module('app')
  .factory('Contract', () => {

    class Contract extends BaseFactory {
      constructor({ id = null, name = null, postScript = null, currency = null, isActive = null, contractTerms = [] }) {
        super({ id, name, postScript, currency, isActive, contractTerms });
      }

      postPayload() {
        return {
          name: this.name,
          postScript: this.postScript,
          currency: this.currency,
          contractTerms: this.contractTerms
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            name: this.name,
            postScript: this.postScript,
            currency: this.currency,
            isActive: this.isActive,
            contractTerms: this.contractTerms
          };
        }

        // Edit In-place update
        return {
          [field]: value,
        };
      }
    };

    return Contract;
  });

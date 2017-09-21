angular.module('app')
  .factory('DailyCost', ($filter) => {

    class DailyCost extends BaseFactory {
      constructor({ id = null, clientContractTerm = null, quantity = 1, workingDay = null, subTotal = 0, isActive = false, isDeleted = false,createdBy = null, createdAt = new Date(), updateBy = null, updatedAt = new Date() }) {
        // Parent
        super({ id, clientContractTerm, quantity, workingDay, subTotal, isActive, isDeleted, createdBy, createdAt, updateBy, updatedAt });
      }

      postPayload() {
        return {
          clientContractTerm: this.clientContractTerm,
          quantity: this.quantity,
          workingDay: this.workingDay,
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          return {
            id: this.id,
            clientContractTerm: this.clientContractTerm,
            quantity: this.quantity,
            workingDay: this.workingDay
          };
        }

        return {
          [field]: value,
        };
      }

      get total() {
        if (_.isEmpty(this.clientContractTerm)) {
          return 0;
        }

        return this.quantity * this.clientContractTerm.referenceCost;
      }
    };

    return DailyCost;
  });

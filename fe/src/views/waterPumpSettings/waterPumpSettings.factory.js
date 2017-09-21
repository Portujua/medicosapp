angular.module('app')
  .factory('WaterPumpSettings', ($filter) => {

    class WaterPumpSettings extends BaseFactory {
      constructor({ id = null, liner = 1, stroke = 1, strokePerMinute = 1, gallonsPerSecond = 1, waterPump = null, job = null,
        isActive = false, isDeleted = false,createdBy = null, createdAt = new Date(), updateBy = null, updatedAt = new Date() }) {
        // Parent
        super({ id, liner,  stroke, strokePerMinute, gallonsPerSecond , waterPump , job ,isActive, isDeleted,
          createdBy, createdAt, updateBy, updatedAt });
      }

      postPayload() {
        return {
          liner: this.liner,
         // efficiency: this.efficiency,
          stroke: this.stroke,
          strokePerMinute : this.strokePerMinute,
          gallonsPerSecond : this.gallonsPerSecond,
          waterPump:{ id : this.waterPump.id },
          job : this.job
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          return {
            liner: this.liner,
           // quantity: this.quantity,
            stroke: this.stroke,
            strokePerMinute : this.strokePerMinute,
            gallonsPerSecond : this.gallonsPerSecond,
            waterPump:{ id : this.waterPump.id },
            job : this.job
          };
        }

        return {
          [field]: value,
        };
      }

     /* get total() {
        if (_.isEmpty(this.clientContractTerm)) {
          return 0;
        }

        return this.quantity * this.clientContractTerm.referenceCost;
      }*/
    };

    return WaterPumpSettings;
  });

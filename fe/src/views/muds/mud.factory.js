angular.module('app')
  .factory('Mud', () => {

    class Mud extends BaseFactory {
      constructor({ id = null, mudType = null, checkedAt = null, viscosity = null, waterPercentage = null, solidPercentage = null, gasPercentage = null,
        hardness = null, chloride = null, sand = null, fluidLoss=null, additives = null, sampleTempeture=null, addtionalComments = null,
        isActive = false, isDeleted=false,createdBy = null, createdAt = new Date(), updateBy = null,updatedAt = new Date() , job = null }) {
        // Parent
        super({ id, mudType, checkedAt, viscosity, waterPercentage, solidPercentage, gasPercentage, hardness, chloride,
         sand, fluidLoss, additives, sampleTempeture, addtionalComments, isActive, isDeleted, createdBy, createdAt, updateBy, updatedAt, job });
      }

      postPayload() {
        return {
          mudType: this.mudType,
          checkedAt: this.checkedAt,
          viscosity: this.viscosity,
          waterPercentage: this.waterPercentage,
          solidPercentage: this.solidPercentage,
          gasPercentage: this.gasPercentage,
          hardness: this.hardness,
          chloride: this.chloride,
          sand: this.sand,
          fluidLoss : this.fluidLoss,
          additives: this.additives,
          sampleTempeture: this.sampleTempeture,
          addtionalComments: this.addtionalComments,
          job: this.job
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          return {
            id: this.id,
            mudType: this.mudType,
            checkedAt: this.checkedAt,
            viscosity: this.viscosity,
            waterPercentage: this.waterPercentage,
            solidPercentage: this.solidPercentage,
            gasPercentage: this.gasPercentage,
            hardness: this.hardness,
            chloride: this.chloride,
            sand: this.sand,
            fluidLoss : this.fluidLoss,
            additives: this.additives,
            sampleTempeture: this.sampleTempeture,
            addtionalComments: this.addtionalComments
          };
        }

        return {
          [field]: value,
        };
      }
    };

    return Mud;
  });

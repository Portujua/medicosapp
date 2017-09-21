angular.module('app')
  .factory('Motor', () => {

    class Motor extends BaseFactory {
      constructor({ id = null, componentId = null, name = null, description = null, model = null, displacement = 0, minFlowRate = 0, maxFlowRate = 0, maxWOB = 0, maxDiffPressure = 0, maxTorque = 0, maxPower = 0, bendType = null, length = 0, weight = 0, isActive = true, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date() }) {

        let type = 'motor';

        super({ id, type, componentId, name, description, model, displacement, minFlowRate, maxFlowRate, maxWOB, maxDiffPressure, maxTorque, maxPower, bendType, length, weight, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
      }

      postPayload() {
        return {
          type: this.type,
          name: this.name,
          description: this.description,
          model: this.model,
          displacement: this.displacement,
          minFlowRate: this.minFlowRate,
          maxFlowRate: this.maxFlowRate,
          maxWOB: this.maxWOB,
          maxDiffPressure: this.maxDiffPressure,
          maxTorque: this.maxTorque,
          maxPower: this.maxPower,
          bendType: this.bendType,
          length: this.length,
          weight: this.weight,
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            // id: this.id,
            type: this.type,
            name: this.name,
            description: this.description,
            model: this.model,
            displacement: this.displacement,
            minFlowRate: this.minFlowRate,
            maxFlowRate: this.maxFlowRate,
            maxWOB: this.maxWOB,
            maxDiffPressure: this.maxDiffPressure,
            maxTorque: this.maxTorque,
            maxPower: this.maxPower,
            bendType: this.bendType,
            length: this.length,
            weight: this.weight,
          };
        }

        // Edit In-place update
        return {
          [field]: value,
        };
      }
    };

    return Motor;
  });

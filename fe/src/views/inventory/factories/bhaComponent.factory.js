angular.module('app')
  .factory('BhaComponent', () => {

    class BhaComponent extends BaseFactory {
      constructor({ id = null, componentId = null, innerDiameter = 0, name = null, description = null, outerDiameter = 0, length = 0, model = null, nominalWeight = 0, dryWeight = 0, maxTorque = 0, topConnectorSize = 0, topConnectorType = null, topConnector = 'Pin', bottomConnectorSize = 0, bottomConnectorType = null, bottomConnector = 'Box', fishNeckOuterDiameter = 0, fishNeckLength = 0, isActive = true, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date() }) {

        let type = 'bhaComponent';

        super({ id, type, componentId, innerDiameter, name, description, outerDiameter, length, model, nominalWeight, dryWeight, maxTorque, topConnectorSize, topConnectorType, topConnector, bottomConnectorSize, bottomConnectorType, bottomConnector, fishNeckOuterDiameter, fishNeckLength, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
      }

      postPayload() {
        return {
          type: this.type,
          name: this.name,
          description: this.description,
          model: this.model,
          innerDiameter: this.innerDiameter,
          outerDiameter: this.outerDiameter,
          length: this.length,
          nominalWeight: this.nominalWeight,
          dryWeight: this.dryWeight,
          maxTorque: this.maxTorque,
          topConnectorSize: this.topConnectorSize,
          topConnectorType: this.topConnectorType,
          topConnector: this.topConnector,
          bottomConnectorSize: this.bottomConnectorSize,
          bottomConnectorType: this.bottomConnectorType,
          bottomConnector: this.bottomConnector,
          fishNeckOuterDiameter: this.fishNeckOuterDiameter,
          fishNeckLength: this.fishNeckLength,
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
            innerDiameter: this.innerDiameter,
            outerDiameter: this.outerDiameter,
            length: this.length,
            nominalWeight: this.nominalWeight,
            dryWeight: this.dryWeight,
            maxTorque: this.maxTorque,
            topConnectorSize: this.topConnectorSize,
            topConnectorType: this.topConnectorType,
            topConnector: this.topConnector,
            bottomConnectorSize: this.bottomConnectorSize,
            bottomConnectorType: this.bottomConnectorType,
            bottomConnector: this.bottomConnector,
            fishNeckOuterDiameter: this.fishNeckOuterDiameter,
            fishNeckLength: this.fishNeckLength,
          };
        }

        // Edit In-place update
        return {
          [field]: value,
        };
      }
    };

    return BhaComponent;
  });

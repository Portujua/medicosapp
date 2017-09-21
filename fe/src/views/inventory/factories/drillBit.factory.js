angular.module('app')
  .factory('DrillBit', () => {

    class DrillBit extends BaseFactory {
      constructor({ id = null, componentId = null, name = null, description = null, model = null, bitType = null, size = 0, gauge = 0, numberOfJets = 1, bearingStyle = 0, bearingSeal = 0, diameter = 0, isActive = true, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date() }) {

        let type = 'drillBit';

        super({ id, type, componentId, name, description, model, bitType, size, gauge, numberOfJets, bearingStyle, bearingSeal, diameter, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
      }

      postPayload() {
        return {
          type: this.type,
          name: this.name,
          description: this.description,
          model: this.model,
          bitType: this.bitType,
          size: this.size,
          gauge: this.gauge,
          numberOfJets: this.numberOfJets,
          bearingStyle: this.bearingStyle,
          bearingSeal: this.bearingSeal,
          diameter: this.diameter,
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
            bitType: this.bitType,
            size: this.size,
            gauge: this.gauge,
            numberOfJets: this.numberOfJets,
            bearingStyle: this.bearingStyle,
            bearingSeal: this.bearingSeal,
            diameter: this.diameter,
          };
        }

        // Edit In-place update
        return {
          [field]: value,
        };
      }
    };

    return DrillBit;
  });

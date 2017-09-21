angular.module('app')
  .factory('WaterPump', () => {

    class WaterPump extends BaseFactory {
      constructor({ id = null, componentId = null, poundsPerSquareInch = 0, name = null, description = null, efficiency = 0, equivalentCirculatingDensity = 0, model = null, annularVelocityDrillPipe = 0, annularVelocityDrillCollar = 0, bitHHP = 0, pumpHHP = 0, isActive = true, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date() }) {

        let type = 'waterPump';

        super({ id, type, componentId, poundsPerSquareInch, name, description, efficiency, equivalentCirculatingDensity, model, annularVelocityDrillPipe, annularVelocityDrillCollar, bitHHP, pumpHHP, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
      }

      postPayload() {
        return {
          type: this.type,
          name: this.name,
          description: this.description,
          model: this.model,
          poundsPerSquareInch: this.poundsPerSquareInch,
          efficiency: this.efficiency,
          equivalentCirculatingDensity: this.equivalentCirculatingDensity,
          annularVelocityDrillPipe: this.annularVelocityDrillPipe,
          annularVelocityDrillCollar: this.annularVelocityDrillCollar,
          bitHHP: this.bitHHP,
          pumpHHP: this.pumpHHP,
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
            poundsPerSquareInch: this.poundsPerSquareInch,
            efficiency: this.efficiency,
            equivalentCirculatingDensity: this.equivalentCirculatingDensity,
            annularVelocityDrillPipe: this.annularVelocityDrillPipe,
            annularVelocityDrillCollar: this.annularVelocityDrillCollar,
            bitHHP: this.bitHHP,
            pumpHHP: this.pumpHHP,
          };
        }

        // Edit In-place update
        return {
          [field]: value,
        };
      }
    };

    return WaterPump;
  });

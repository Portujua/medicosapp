angular.module('app')
  .factory('Casing', () => {

    class Casing extends BaseFactory {
      constructor({ id = null, description = null, outerDiameter = 0,innerDiameter = 0, top = 0, bottom = 0, weight = 0, size = 0, job = null, wellbore = null, isActive = true, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date() }) {

        super({ id, description, outerDiameter, innerDiameter, top, bottom, weight, size, job, wellbore, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
      }

      postPayload() {
        return {
          outerDiameter: this.outerDiameter,
          innerDiameter: this.innerDiameter,
          top: this.top,
          bottom: this.bottom,
          weight: this.weight,
          size: this.size,
          description: this.description,
          job: this.job,
          wellbore: this.wellbore
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            outerDiameter: this.outerDiameter,
            innerDiameter: this.innerDiameter,
            top: this.top,
            bottom: this.bottom,
            weight: this.weight,
            size: this.size,
            description: this.description,
            job: this.job,
            wellbore: this.wellbore
          };
        } else {
          // Edit In-place update
          return {
            [field]: value,
          }
        }
      }
    }

    return Casing;
  });

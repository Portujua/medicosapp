angular.module('app')
  .factory('Formation', () => {

    class Formation extends BaseFactory {
      constructor({ id = null, formation = null, wellbore = null, startDepth = null, endDepth = null, job = null, isActive = true, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date() }) {
        super({ id, formation, wellbore, startDepth, endDepth, job, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
      }

      postPayload() {
        return {
          formation: this.formation,
          wellbore: this.wellbore,
          startDepth: this.startDepth,
          endDepth: this.endDepth,
          job: this.simplify(this.job),
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            formation: this.formation,
            wellbore: this.wellbore,
            startDepth: this.startDepth,
            endDepth: this.endDepth,
            job: this.simplify(this.job),
          };
        }

        // Edit In-place update
        return {
          [field]: value,
        };
      }
    };

    return Formation;
  });

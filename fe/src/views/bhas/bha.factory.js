angular.module('app')
  .factory('Bha', () => {

    class Bha extends BaseFactory {
      constructor({ id = null, name = null, bhaType = null, bhaObjective = null, description = null, reasonToPull = null, performance = null, propBUR = 0, bhaComponents = [], job = null, isActive = true, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date() }) {
        super({ id, name, bhaType, bhaObjective, description, reasonToPull, performance, propBUR, bhaComponents, job, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
      }

      postPayload() {
        return {
          name: this.name,
          bhaType: this.simplify(this.bhaType),
          bhaObjective: this.simplify(this.bhaObjective),
          description: this.description,
          reasonToPull: this.simplify(this.reasonToPull),
          performance: this.performance,
          propBUR: this.propBUR,
          bhaComponents: this.bhaComponents,
          job: this.simplify(this.job),
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            name: this.name,
            bhaType: this.simplify(this.bhaType),
            bhaObjective: this.simplify(this.bhaObjective),
            description: this.description,
            reasonToPull: this.simplify(this.reasonToPull),
            performance: this.performance,
            propBUR: this.propBUR,
            bhaComponents: this.bhaComponents,
            job: this.simplify(this.job),
          };
        }

        // Edit In-place update
        return {
          [field]: value,
        };
      }
    };

    return Bha;
  });

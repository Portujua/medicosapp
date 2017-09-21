angular.module('app')
  .factory('WorkingDay', () => {

    class WorkingDay extends BaseFactory {
      constructor({ id = null, date = new Date(), job = null, dailyComments = null, activities = null, dailyCosts = null, isActive = false, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null ,  updatedAt = new Date() }) {
        super({ id, date, job, dailyComments, activities, dailyCosts, isActive , isDeleted , createdBy , createdAt , updatedBy , updatedAt });
      }

      postPayload() {
        return {
          date: this.date,
          dailyComments: this.dailyComments,
          job: this.simplify(this.job),
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            date: this.date,
            dailyComments: this.dailyComments,
            job: this.simplify(this.job),
          };
        }

        // Edit In-place update
        return {
          [field]: value,
        };
      }
    };

    return WorkingDay;
  });

angular.module('app')
  .factory('HourEntry', ($filter) => {

    class HourEntry extends BaseFactory {
      constructor({ id = null, personnel = null, job = null, hourType = null, approved = 'PENDING', approvedBy = null, approvedAt = new Date(), extraHours = false, date = new Date(), startTime =  new Date(),  endTime= new Date(), comments= null, isActive = false, isDeleted=false,createdBy = null, createdAt = new Date(), updateBy = null, updatedAt = new Date()  }) {
        // Parent
        super({ id, personnel, job, hourType, approvedBy, approvedAt, approved, extraHours, date, startTime,  endTime, comments,   isActive, isDeleted, createdBy, createdAt, updateBy, updatedAt });
      }

      postPayload() {
        return {
          personnel: this.personnel.personnel,
          job: this.job,
          hourType: this.hourType,
          extraHours: this.extraHours,
          date: $filter('date')(this.date, 'yyyy-MM-dd'),
          startTime : $filter('date')(this.startTime, 'HH:mm:ss'),
          endTime: $filter('date')(this.endTime, 'HH:mm:ss'),
          approved: this.approved,
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          return {
            id: this.id,
            personnel: this.personnel,
            job: this.job,
            hourType: this.hourType,
            approvedBy: this.approvedBy,
            extraHours: this.extraHours,
            date: this.date,
            hiredAt: this.hiredAt,
            startTime : this.startTime,
          };
        }

        return {
          [field]: value,
        };
      }
    };

    return HourEntry;
  });

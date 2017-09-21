angular.module('app')
  .factory('Personnel', () => {

    class User extends BaseFactory {
      constructor({ id = null, name = null, email = null, cellPhoneNumber = null, user = null, jobPhoneNumber = null, otherPhoneNumber = null, positionType = null, contractType = null, isRigOperator = false, isActive = false, isDeleted=false,createdBy = null, createdAt = new Date(), updateBy = null, updatedAt = new Date() , hiredAt = null }) {
        // Parent
        super({ id, name, email, cellPhoneNumber, jobPhoneNumber, otherPhoneNumber, user, positionType, contractType,  isActive, isRigOperator, isDeleted, createdBy, createdAt, updateBy, updatedAt, hiredAt });
      }

      postPayload() {
        return {
          name: this.name,
          email: this.email,
          cellPhoneNumber: this.cellPhoneNumber,
          jobPhoneNumber: this.jobPhoneNumber,
          user: this.simplify(this.user),
          otherPhoneNumber: this.otherPhoneNumber,
          positionType: this.positionType,
          contractType: this.contractType,
          hiredAt: this.hiredAt,
          isRigOperator : this.isRigOperator,
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          return {
            id: this.id,
            name: this.name,
            email: this.email,
            user: this.user,
            cellPhoneNumber: this.cellPhoneNumber,
            jobPhoneNumber: this.jobPhoneNumber,
            otherPhoneNumber: this.otherPhoneNumber,
            positionType: this.positionType,
            contractType: this.contractType,
            hiredAt: this.hiredAt,
            isRigOperator : this.isRigOperator,
          };
        }

        return {
          [field]: value,
        };
      }
    };

    return User;
  });

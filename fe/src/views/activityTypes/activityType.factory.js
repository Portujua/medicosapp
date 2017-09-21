angular.module('app')
  .factory('ActivityType', () => {

    class ActivityType extends BaseFactory {
      constructor({ id = null, code = null, name = null, tooltip = null, calculateTotalHours = false,   calculateTotalFootage = false,
        hasDrillingParameters = false, calculateROP = false, slidingHours = false, slidingFootage = false, slidingROP = false, 
        slidingPercentage = false, rotatingHours = false, rotatingFootage = false, rotatingROP = false, rotatingPercentage = false, 
        circulatingHours = false, trippingHours = false, onBottomHours = false, BRTHours = false, isActive = false ,isDeleted = false, 
        createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date() }) {
        // Parent
        super({ id, code, name, tooltip, calculateTotalHours, calculateTotalFootage, hasDrillingParameters , calculateROP , slidingHours,
          slidingFootage , slidingROP ,slidingPercentage , rotatingHours, rotatingFootage , rotatingROP , rotatingPercentage , circulatingHours ,
          trippingHours , onBottomHours , BRTHours , isActive, isDeleted , createdBy , createdAt , updatedBy, updatedAt  });
      }



      postPayload() {
        return {
          code:this.code,
          name: this.name,
          tooltip: this.tooltip,
          calculateTotalHours: this.calculateTotalHours,
          calculateTotalFootage: this.calculateTotalFootage,
          hasDrillingParameters: this.hasDrillingParameters,
          calculateROP: this.calculateROP,
          slidingHours: this.slidingHours, 
          slidingFootage: this.slidingFootage,
          slidingROP: this.slidingROP, 
         // slidingPercentage: this.slidingPercentage, 
          rotatingHours: this.rotatingHours,
          rotatingFootage: this.rotatingFootage,
          rotatingROP: this.rotatingROP, 
         // rotatingPercentage: this.rotatingPercentage,
          circulatingHours: this.circulatingHours,
          trippingHours: this.trippingHours,
          onBottomHours: this.onBottomHours,
          BRTHours: this.BRTHours,
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            code: this.code,
            name: this.name,
            tooltip: this.tooltip,
            calculateTotalHours: this.calculateTotalHours,
            calculateTotalFootage: this.calculateTotalFootage,
            hasDrillingParameters: this.hasDrillingParameters,
            calculateROP: this.calculateROP,
            slidingHours: this.slidingHours, 
            slidingFootage: this.slidingFootage,
            slidingROP: this.slidingROP, 
            //slidingPercentage: this.slidingPercentage, 
            rotatingHours: this.rotatingHours,
            rotatingFootage: this.rotatingFootage,
            rotatingROP: this.rotatingROP, 
            //rotatingPercentage: this.rotatingPercentage,
            circulatingHours: this.circulatingHours,
            trippingHours: this.trippingHours,
            onBottomHours: this.onBottomHours,
            BRTHours: this.BRTHours,
            isActive : this.isActive

          };
        } else {
          // Edit In-place update
          return {
            [field]: value,
          }
        }
      }
    };

    return ActivityType;
  });

angular.module('app')
  .factory('DrillingParameters', () => {

    class DrillingParameters extends BaseFactory {
      constructor({ id, revolutionsPerMinuteAvg = 0, weightOnBitAvg = 0, flowRateAvg = 0, bottomHoleTempetureAvg = 0, pickUpAvg = 0, deltaPressureAvg = 0, slackOffAvg = 0, rotOffBottomAvg = 0, standPipePressureOffBottomAvg = 0, standPipePressureOnBottomAvg = 0, surfaceTorqueAvg = 0, inFlowTempetureAvg = 0, outFlowTempetureAvg = 0, activity = null, isActive = true, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = null }) {

        super({ id, revolutionsPerMinuteAvg, weightOnBitAvg, flowRateAvg, bottomHoleTempetureAvg, pickUpAvg, slackOffAvg, rotOffBottomAvg, standPipePressureOffBottomAvg, standPipePressureOnBottomAvg , surfaceTorqueAvg, inFlowTempetureAvg, outFlowTempetureAvg, activity, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
      }

      get deltaPressureAvg() {
        if (_.isNull(this.standPipePressureOnBottomAvg) || _.isNull(this.standPipePressureOffBottomAvg)){
          return null;
        }
        return this.standPipePressureOnBottomAvg - this.standPipePressureOffBottomAvg;
      }

      set deltaPressureAvg(value) { this.deltaPressureAvg = value; }

      postPayload() {
        return {
          activity: this.activity,
          revolutionsPerMinuteAvg: this.revolutionsPerMinuteAvg,
          weightOnBitAvg : this.weightOnBitAvg,
          flowRateAvg: this.flowRateAvg,
          bottomHoleTempetureAvg: this.bottomHoleTempetureAvg,
          pickUpAvg: this.pickUpAvg,
          slackOffAvg: this.slackOffAvg,
          deltaPressureAvg: this.deltaPressureAvg,
          rotOffBottomAvg: this.rotOffBottomAvg,
          standPipePressureOffBottomAvg: this.standPipePressureOffBottomAvg,
          standPipePressureOnBottomAvg: this.standPipePressureOnBottomAvg,
          surfaceTorqueAvg: this.surfaceTorqueAvg,
          inFlowTempetureAvg: this.inFlowTempetureAvg,
          outFlowTempetureAvg: this.outFlowTempetureAvg
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          return {
            activity: this.simplify(this.activity),
            revolutionsPerMinuteAvg: this.revolutionsPerMinuteAvg,
            weightOnBitAvg : this.weightOnBitAvg,
            flowRateAvg: this.flowRateAvg,
            bottomHoleTempetureAvg: this.bottomHoleTempetureAvg,
            pickUpAvg: this.pickUpAvg,
            slackOffAvg: this.slackOffAvg,
            deltaPressureAvg: this.deltaPressureAvg,
            rotOffBottomAvg: this.rotOffBottomAvg,
            standPipePressureOffBottomAvg: this.standPipePressureOffBottomAvg,
            standPipePressureOnBottomAvg: this.standPipePressureOnBottomAvg,
            surfaceTorqueAvg: this.surfaceTorqueAvg,
            inFlowTempetureAvg: this.inFlowTempetureAvg,
            outFlowTempetureAvg: this.outFlowTempetureAvg
          };
        }

        return {
          [field]: value,
        };
      }
    };

    return DrillingParameters;
  });

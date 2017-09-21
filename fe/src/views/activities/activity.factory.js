angular.module('app')
  .factory('Activity', (StringUtil, DateUtil, TimeUtil, NumericUtil, DrillingParameters, $filter) => {

    class Activity extends BaseFactory {
      constructor({ id, activityType = null, drillingParameters = null, bha = null, phase = 'HORIZONTAL', wellbore = null, measurementWhileDrilling = null, comments = null, startTime = new Date(), endTime = new Date(), startDepth = 0, endDepth = 0, day = null, isActive = true, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = null }) {

        // Instanciate DP
        if (!_.isEmpty(drillingParameters)) {
          drillingParameters = new DrillingParameters(drillingParameters);
          drillingParameters.activity = { id };
        }

        super({ id, activityType, drillingParameters, bha, phase, wellbore, measurementWhileDrilling, comments, startTime, endTime, startDepth, endDepth, day, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
      }

      get duration() {
        return NumericUtil.round(TimeUtil.getDuration(this.endTime, this.startTime, 'hours'), 1);
      }

      get __duration() {
        return TimeUtil.getDuration(this.endTime, this.startTime, 'hours');
      }

      set duration(value) {
        // Calculate the new endTime
        let newTime = TimeUtil.addDuration(this.startTime, value, 'hours');
        // If the new endTime is in the same day of startTime
        if (DateUtil.isSame(this.startTime, newTime)) {
          this.endTime = newTime;
        }
      }

      get footage() { return this.endDepth - this.startDepth; }

      get invalidDepth() { return (this.endDepth - this.startDepth) < 0; }
      get invalidTime() { return this.__duration < 0; }

      setComments() {
        if (this.activityType && this.activityType.hasDrillingParameters) {
          // Form the comment
          this.comments = `(WOB=${this.drillingParameters.weightOnBitAvg || 0};GPM=${this.drillingParameters.flowRateAvg || 0};RPM=${this.drillingParameters.revolutionsPerMinuteAvg || 0};DP=${this.drillingParameters.deltaPressureAvg || 0})`;
        } else {
          // Remove comment
          this.comments = null;
        }
      }

      postPayload() {
        return {
          activityType: this.simplify(this.activityType),
          // drillingParameters: this.activityType.hasDrillingParameters ? this.drillingParameters.postPayload() : null,
          bha: this.simplify(this.bha),
          measurementWhileDrilling: this.simplify(this.measurementWhileDrilling),
          phase: this.phase,
          wellbore: this.simplify(this.wellbore),
          comments: this.comments,
          startTime: this.startTime,
          endTime: this.endTime,
          startDepth: this.startDepth,
          endDepth: this.endDepth,
          formations: this.formations,
          day: this.simplify(this.day),
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          return {
            id: this.id,
            activityType: this.simplify(this.activityType),
            // drillingParameters: this.activityType.hasDrillingParameters ? this.drillingParameters.postPayload() : null,
            bha: this.simplify(this.bha),
            measurementWhileDrilling: this.simplify(this.measurementWhileDrilling),
            phase: this.phase,
            wellbore: this.simplify(this.wellbore),
            comments: this.comments,
            startTime: this.startTime,
            endTime: this.endTime,
            startDepth: this.startDepth,
            endDepth: this.endDepth,
            formations: this.formations,
            day: this.simplify(this.day),
          };
        }

        return {
          [field]: value,
        };
      }
    };

    return Activity;
  });

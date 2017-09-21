angular.module('app')
  .factory('Survey', () => {

    class Survey extends BaseFactory {
      constructor({ id, measuredDepth = 0, inclination = 0, azimuth = 0, northings = 0, eastings = 0, verticalSection = 0, trueVerticalDepth = 0, doglegSeverity = 0, buildUpRate = 0, turnRate = 0, tiein = false, toolface = 0, holeDepth = 0, wellbore = null, job = null, isActive = true, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date() }) {
        super({ id, measuredDepth, inclination, azimuth, northings, eastings, verticalSection, trueVerticalDepth, doglegSeverity, buildUpRate, turnRate, tiein, toolface, holeDepth, wellbore, job, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
      }

      postPayload() {
        return {
          measuredDepth: this.measuredDepth,
          inclination: this.inclination,
          azimuth: this.azimuth,
          northings: this.northings,
          eastings: this.eastings,
          verticalSection: this.verticalSection,
          trueVerticalDepth: this.trueVerticalDepth,
          doglegSeverity: this.doglegSeverity,
          buildUpRate: this.buildUpRate,
          turnRate: this.turnRate,
          tiein: this.tiein,
          toolface: this.toolface,
          holeDepth: this.holeDepth,
          wellbore: this.simplify(this.wellbore),
          job: this.simplify(this.job),
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            measuredDepth: this.measuredDepth,
            inclination: this.inclination,
            azimuth: this.azimuth,
            northings: this.northings,
            eastings: this.eastings,
            verticalSection: this.verticalSection,
            trueVerticalDepth: this.trueVerticalDepth,
            doglegSeverity: this.doglegSeverity,
            buildUpRate: this.buildUpRate,
            turnRate: this.turnRate,
            tiein: this.tiein,
            toolface: this.toolface,
            holeDepth: this.holeDepth,
            wellbore: this.simplify(this.wellbore),
            job: this.simplify(this.job),
          };
        }

        // Edit In-place update
        return {
          [field]: value,
        };
      }
    };

    return Survey;
  });

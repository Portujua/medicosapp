angular.module('app')
  .factory('Wellbore', () => {
  	class Wellbore extends BaseFactory {
  		constructor({ id = null, name = null, wellboreShape = null, totalDepth = 0, tieInDepth = 0, verticalSectionDirection = 0, magDeclin = 0, northReference = 'TRUE', targetFormation = null, parentWellbore = null, well = null, isActive = null, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date() }) {

  			super ({ id, name, wellboreShape, totalDepth, tieInDepth, verticalSectionDirection, magDeclin, northReference, targetFormation, parentWellbore, well, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
			}

  		postPayload() {
  			return {
  				name: this.name,
  				wellboreShape: this.wellboreShape,
  				totalDepth: this.totalDepth,
  				tieInDepth: this.tieInDepth,
  				verticalSectionDirection: this.verticalSectionDirection,
  				magDeclin: this.magDeclin,
  				northReference: this.northReference,
          targetFormation: this.targetFormation,
          parentWellbore: this.parentWellbore,
  				well: this.well,
  			};
  		}

  		putPayload(field, value) {
  			if (_.isEmpty(field)) {
  				return {
            id: this.id,
  					name: this.name,
  					wellboreShape: this.wellboreShape,
  					totalDepth: this.totalDepth,
  					tieInDepth: this.tieInDepth,
  					verticalSectionDirection: this.verticalSectionDirection,
  					magDeclin: this.magDeclin,
  					northReference: this.northReference,
            targetFormation: this.targetFormation,
            parentWellbore: this.parentWellbore,
  					well: this.well,
  				};
  			}

  			return {
    			[field]: value,
  			};
  		}
  	}

  	return Wellbore;
	});

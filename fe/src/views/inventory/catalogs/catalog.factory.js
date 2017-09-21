angular.module('app')
  .factory('Catalog', () => {

    class Catalog extends BaseFactory {
      constructor({ id = null, serialNumber = null, name = null, description = null, manufacturer = null, itemType = 'BHACOMPONENT', baseImage = null, isBHAPart = true, model = null, categories = [], imagePath = null, isActive = true, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date() }) {
        super({ id, serialNumber, name, description, manufacturer, itemType, baseImage, isBHAPart, model, categories, imagePath, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
      }

      postPayload(detail) {
        return {
          entry: {
            serialNumber: !_.isEmpty(this.serialNumber) ? this.serialNumber.toUpperCase() : this.serialNumber,
            name: this.name,
            description: this.description,
            manufacturer: this.simplify(this.manufacturer),
            itemType: this.itemType,
            baseImage: this.baseImage,
            isBHAPart: this.isBHAPart,
            model: this.model,
            categories: _.map(this.categories, (value) => this.simplify(value)),
          },
          detail,
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            serialNumber: !_.isEmpty(this.serialNumber) ? this.serialNumber.toUpperCase() : this.serialNumber,
            name: this.name,
            description: this.description,
            manufacturer: this.simplify(this.manufacturer),
            itemType: this.itemType,
            baseImage: this.baseImage,
            isBHAPart: this.isBHAPart,
            model: this.model,
            categories: _.map(this.categories, (value) => this.simplify(value)),
          };
        }

        // Edit In-place update
        return {
          [field]: value,
        };
      }
    };

    return Catalog;
  });

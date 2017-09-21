angular.module('app')
  .factory('CatalogCategory', () => {

    class CatalogCategory extends BaseFactory {
      constructor({ id = null, parent = null, description = null, name = null, children = [], catalogEntries = [], isActive = true, isDeleted = false, createdBy = null, createdAt = new Date(), updatedBy = null, updatedAt = new Date() }) {

        if (!_.isEmpty(parent)) {
          delete parent.loaded;
        }

        super({ id, parent, description, name, children, catalogEntries, isActive, isDeleted, createdBy, createdAt, updatedBy, updatedAt });
      }

      postPayload() {
        return {
          parent: this.simplify(this.parent),
          description: this.description,
          name: this.name,
        };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            id: this.id,
            parent: this.simplify(this.parent),
            description: this.description,
            name: this.name,
          };
        }

        // Edit In-place update
        return {
          [field]: value,
        };
      }
    };

    return CatalogCategory;
  });

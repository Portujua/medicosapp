angular.module('app')
.factory('ChatMessage', (Auth) => {

  class ChatMessage extends BaseFactory {
    constructor({ id = null, html = null, user = null, owner = Auth.getSession(), hora = new Date(), createdAt = null, modifiedAt = null, leido = null, area = null }) {
      // Parent
      super({ id, html, user, owner, hora, createdAt, modifiedAt, leido, area });
    }

    postPayload() {
      return {
        html: this.html,
        user: this.user.id ? this.user.id : this.user,
        owner: this.owner.id ? this.owner.id : this.owner,
        hora: this.hora,
        area: this.area.id ? this.area.id : this.area
      };
    }

    putPayload(field, value) {
      if (_.isEmpty(field)) {
        // Bulk update
        return {
          // todo
        };
      }

      // Edit In-place update
      return {
        [field]: value,
      };
    }
  };

  return ChatMessage;
});

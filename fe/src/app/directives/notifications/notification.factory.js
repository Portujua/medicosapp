angular.module('app')
  .factory('Notification', (StringUtil) => {

    class Notification extends BaseFactory {
      /**
       * [constructor description]
       * @param  {GUID} options.id
       * @param  {Object} options.user
       * @param  {Object} options.mention
       * @param  {String} options.type
       *             comment|fail|approvement|sync|status|sidetrack|mention|attachment
       * @param  {String} options.status    unread|warning
       * @param  {String} options.content
       * @param  {Date}   options.createdAt
       */
      constructor({ id = StringUtil.getGUID(), user = null, mention = null, type = 'comment', status = 'unread', content = null, createdAt = new Date() }) {
        super({ id, user, mention, type, status, content, createdAt });
      }
    };

    return Notification;
  });

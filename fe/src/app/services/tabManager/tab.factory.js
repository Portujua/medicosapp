angular.module('app')
  .factory('Tab', (StringUtil, $templateCache, TAB_COLORS) => {

    class Tab extends BaseFactory {
      constructor({ _id = `T${StringUtil.getGUID().replace(/-/g, '')}`, title = null, component = 'emptyTab', id = null, icon = null, disabled = false, isPinned = false, order = Number.MAX_SAFE_INTEGER, isThin = false, hasPadding = false, color = '', parentId = null, jobId = null }) {

        // If there is not a color set, we look in the index
        if (_.isEmpty(color)) {
          let c = _.findWhere(TAB_COLORS, { component });
          color = _.isEmpty(c) ? '' : c.color;
        }

        super({ _id, title, component, id, icon, disabled, isPinned, order, isThin, hasPadding, color, parentId, jobId });

        // Template name
        this._templateName = `${this.component}@${this._id}`;

        // Create template
        this.createTemplate();
      }

      createTemplate() {
        // emptyTab to empty-tab
        let componentName = s.dasherize(this.component);
        // If the componente has an id
        let id = _.isEmpty(this.id) ? '' : ` id="${this.id}"`;
        // The tab
        let tabId = ` tab-id="${this._id}"`;
        // ParentId
        let parentId = _.isEmpty(this.parentId) ? '' : ` parent-id="${this.parentId}"`;
        // jobId
        let jobId = _.isEmpty(this.jobId) ? '' : ` job-id="${this.jobId}"`;
        // Create template
        $templateCache.put(this._templateName, `<${componentName}${id}${tabId}${parentId}${jobId}></${componentName}>`);
      }
    };

    return Tab;
  });

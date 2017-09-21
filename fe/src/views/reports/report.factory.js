angular.module('app')
  .factory('Report', (StringUtil, $templateCache, TAB_COLORS) => {

    class Report extends BaseFactory {
      constructor({ _id = `T${StringUtil.getGUID().replace(/-/g, '')}`, component = null, active = false, search = '', sizeClass = 'col-4 col-xl-3', permission = null }) {
        if (_.isNull(component)) {
          throw 'Report component cannot be null';
        }
        
        super({ _id, component, active, search, sizeClass, permission });

        // Template name
        this._templateName = `${this.component}@${this._id}`;

        // Create template
        this.createTemplate();
      }

      createTemplate() {
        // emptyReport to empty-tab
        let componentName = s.dasherize(this.component);

        // Component HTML
        let componentHtml = `<${componentName}></${componentName}>`;
        
        // Create template
        $templateCache.put(this._templateName, componentHtml);
      }
    };

    return Report;
  });

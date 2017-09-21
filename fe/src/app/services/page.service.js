(() => {

class PageService {
  constructor(APP_INFO, $state, $rootScope) {
    // Setting app version
    this.APP_INFO = APP_INFO;
    this.$state = $state;
    this.$rootScope = $rootScope;
  }

  getAppInfo() {
    return this.APP_INFO;
  }

  /**
   * Get current page information
   */
  get() {
    if (this.$state.is(this.$state.current.name)) {
      // globals setting for the current page
      let appInfo = this.APP_INFO,
          appName = appInfo.name ? `${appInfo.name} | ` : '',
          pageTitle = this.$state.current.title;

      this.$rootScope.PAGE_INFO = angular.copy(this.$state.current);
      this.$rootScope.PAGE_INFO.title = `${appName}${pageTitle}`;

      return this.$state.current.name;
    }
  }
};

angular.module('app')
  .service('PageService', PageService);

})();

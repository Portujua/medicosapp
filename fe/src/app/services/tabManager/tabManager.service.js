;(() => {

class TabManagerService {
  constructor(Tab, StringUtil, StorageService, $timeout) {
    this.Tab = Tab;
    this.StringUtil = StringUtil;
    this.StorageService = StorageService;
    this.$timeout = $timeout;
    this._containerName = 'ACTIVE_TAB_MANAGER';
    this._historyName = 'TAB_MANAGER_HISTORY';
    this.TIME_TO_WAIT = 0;
    this.api = {};
    this.reset();
  }

  // Call a function in a tab
  call(tabId, fnName) {
    if (_.isEmpty(tabId) || _.isEmpty(fnName)) {
      return;
    }

    let scope = angular.element(document.querySelector(`[tab-id="${tabId}"]`)).scope().$$childHead;

    if (_.isEmpty(scope) || _.isEmpty(scope.$ctrl)) {
      return;
    }

    scope.$ctrl[fnName].call(scope.$ctrl);
    // scope.$apply();
  }

  init() {
    // Load the old tabs
    this._load();
    // For chaining
    return this;
  }

  reset() {
    this.active = null;
    this._tabs = [];
    this._history = [];
    // Filters
    this._filters = {
      selected: 'text-muted',
      colors: ['text-muted', 'text-primary', 'color-1', 'color-2', 'color-3', 'color-4', 'color-5', 'color-6', 'color-7', 'color-8', 'color-9', 'color-10'],
    };
    // For chaining
    return this;
  }

  getFilters() {
    return this._filters;
  }

  isShowing(tab) {
    switch (this._filters.selected) {
      case 'text-muted':
        return true;
      case 'text-primary':
        return _.isEmpty(tab.color) || tab.isPinned;
      default:
        return tab.color === this._filters.selected || tab.isPinned
    }
  }

  getTabs() {
    return _.filter(this._tabs, (tab) => this.isShowing(tab));
  }

  getHistory() {
    return _.last(this._history, 5).reverse();
  }

  getCount() {
    return this._tabs.length;
  }

  getHistoryCount() {
    return this._history.length;
  }

  getFirstTab() {
    return _.first(this._tabs) || null;
  }

  getLastTab() {
    return _.last(this._tabs) || null;
  }

  getActiveTab() {
    return _.findWhere(this._tabs, { _id: this.active }) || null;
  }

  _getIndex(tab) {
    return _.indexOf(this._tabs, tab);
  }

  getTab(_id) {
    return _.findWhere(this._tabs, { _id });
  }

  updateTitle(tabId, title) {
    let tab = this.getTab(tabId);

    if (_.isEmpty(tab)) {
      return;
    }

    let index = _.indexOf(this._tabs, tab);

    if (index < 0) {
      return;
    }

    // Change title
    this._tabs[index].title = title;
    // Update cache
    this._put();
    // Recalculate scroll
    this._recalculateScroll();
  }

  _exists(newTab) {
    let tabFound = _.findWhere(this._tabs, { component: newTab.component, id: newTab.id });

    if (_.isEmpty(tabFound)) {
      return false;
    }

    // If the tab exists, then we can update params
    // _.extend(tabFound, newTab);

    // Check if there is a filter applied
    // If the newTab has the same color filter, nothing happen
    // else: we reset the filters
    if (!this.isShowing(tabFound)) {
      this._filters.selected = 'text-muted';
    }
    // Sort
    this._tabs = _.sortBy(this._tabs, (tab) => tab.order);
    // Move active tab
    this.$timeout(() => this.active = tabFound._id, this.TIME_TO_WAIT);
    // Update cache
    this._put();
    // Recalculate scroll
    this._recalculateScroll();

    return true;
  }

  add(tabSettings = {}) {
    if (_.isEmpty(this._containerName)) {
      console.error('There isn\'t a containerName set.');
      return this;
    }

    // Create the new tab
    let newTab = new this.Tab(tabSettings);

    // Check if the tab exists
    if (this._exists(newTab)) {
      return this;
    }

    // If the tab doesnt exist, push it!
    this._tabs.push(newTab);
    // Check if there is a filter applied
    // If the newTab has the same color filter, nothing happen
    // else: we reset the filters
    if (!this.isShowing(newTab)) {
      this._filters.selected = 'text-muted';
    }
    // Sort
    this._tabs = _.sortBy(this._tabs, (tab) => tab.order);
    // Move active tab. We add some time to wait the tab is actually in the list
    this.$timeout(() => this.active = newTab._id, this.TIME_TO_WAIT);
    // Save changes
    this._put();
    // Recalculate scroll
    this._recalculateScroll();
    // For chaining
    return this;
  }

  save() {
    return this._put();
  }

  closeAll() {
    let tabs = _.filter(this._tabs, (value) => !value.isPinned);

    _.each(tabs, (tab, index, list) => {
      this._close(null, tab);
    });

    // Current tab
    this.$timeout(() => this.active = this.getFirstTab()._id, this.TIME_TO_WAIT);
    // Save it
    this._put();
    // Recalculate scroll
    this._recalculateScroll();
    // For chaining
    return this;
  }

  // Active tab
  set active(value) {
    this._active = value;
    // Move tab
    this._scrollTo(this._active);
  }
  get active() { return this._active; }


  // Filter
  filter(filter) {
    this._filters.selected = filter;
    // Recalculate scroll
    this._recalculateScroll();
  }


  // History
  _record(tab) {
    // We see if this tab is already in history
    let tabFound = _.findWhere(this._history, { component: tab.component, id: tab.id });

    // Record date
    tab.closedAt = new Date();

    // The tab is new in history
    if (_.isEmpty(tabFound)) {
      this._history.push(tab);
    } else {
      // The tab already exists
      let index = _.indexOf(this._history, tabFound);
      // Remove the oldest entry
      this._removeFromHistory(index);
      // Push again
      this._history.push(tab);
    }
  }

  _removeFromHistory(index) {
    // Check index
    if (index < 0 || index >=  this._history.length) {
      return;
    }

    let cpy = angular.copy(this._history[index]);

    // Remove the item!
    this._history.splice(index, 1);

    return cpy;
  }

  openFromHistory(index, reversed) {
    if (reversed) {
      index = this.getHistoryCount() - index - 1;
    }
    // Remove the item!
    let tab = this._removeFromHistory(index);
    if (!_.isEmpty(tab)) {
      // Re-open tab
      this.add(tab);
    }
  }

  openLast() {
    // Remove the last item!
    let tab = this._history.pop();
    if (!_.isEmpty(tab)) {
      // Re-open tab
      this.add(tab);
    }
  }

  closeOtherTabs() {
    let tabs = _.filter(this._tabs, (value) => !value.isPinned);

    _.each(tabs, (tab) => {
      if (this.active !== tab._id) {
        this._close(null, tab);
      }
    });
  }

  closeRightTabs() {
    let tabs = _.filter(this._tabs, (value) => !value.isPinned),
        startToDelete = false;

    _.each(tabs, (tab) => {
      // Start to delete from here (right)
      if (startToDelete) {
        this._close(null, tab);
      }
      // Current tab
      if (this.active === tab._id) {
        startToDelete = true;
      }
    });
  }

  closeLeftTabs() {
    let tabs = _.filter(this._tabs, (value) => !value.isPinned),
        startToDelete = true;

    _.each(tabs, (tab) => {
      // Current tab
      if (this.active === tab._id) {
        startToDelete = false;
      }
      // Start to delete from here (left)
      if (startToDelete) {
        this._close(null, tab);
      }
    });
  }

  closeAllByColor() {
    let active = this.getActiveTab();

    if (_.isEmpty(active)) {
      return;
    }

    let tabs = _.filter(this._tabs, (value) => !value.isPinned);

    _.each(tabs, (tab) => {
      if (tab.color === active.color) {
        this._close(null, tab);
      }
    });
  }



  _load() {
    if (_.isEmpty(this._containerName)) {
      console.error('There isn\'t a containerName set.');
      return this;
    }
    // Reset tabs array
    this.reset();
    // Load tabs from cache
    let tabs = this.StorageService.get(this._containerName, 'local');
    let history = this.StorageService.get(this._historyName, 'local');
    // Create all tabs
    _.each(tabs, (tab) => this.add(tab));
    _.each(history, (tab) => this._record(tab));
    // First tab
    // Move active tab. We add some time to wait the tab is actually in the list
    this.$timeout(() => this.active = this.getFirstTab()._id, this.TIME_TO_WAIT);
    // For chaining
    return this;
  }

  _close(ev, tab) {
    // Prevent logout
    if (!_.isEmpty(ev)) {
      ev.preventDefault();
    }

    if (_.isEmpty(this._containerName)) {
      console.error('There isn\'t a containerName set.');
      return this;
    }

    let index = _.indexOf(this._tabs, tab);

    // Check index
    if (index < 0 || index >=  this.getCount()) {
      return this;
    }

    // If the tab is pinned we cant remove it
    if (this._tabs[index].isPinned) {
      return this;
    }

    // Check if the tab is active
    let isActive = this.active === this._tabs[index]._id;

    // Save the tab in the history
    this._record(this._tabs[index].getObject());

    // Remove the item!
    this._tabs.splice(index, 1);
    // Updating active tab index
    if (isActive) {
      this.$timeout(() => this.active = this._tabs[index - 1]._id, this.TIME_TO_WAIT);
    }
    // Save changes
    this._put();
    // Recalculate scroll
    this._recalculateScroll();
    // For chaining
    return this;
  }

  _put() {
    if (_.isEmpty(this._containerName)) {
      console.error('There isn\'t a containerName set.');
      return this;
    }
    // Convert all tabs in regular objects
    let tabs = _.map(this._tabs, (tab) => tab.getObject());
    // Save all tabs
    this.StorageService.put(this._containerName, tabs, 'local');
    this.StorageService.put(this._historyName, this._history, 'local');
    // For chaining
    return this;
  }

  _recalculateScroll() {
    if (this.api.doRecalculate) {
      this.$timeout(() => this.api.doRecalculate(), this.TIME_TO_WAIT);
    }
  }

  _scrollTo(index) {
    if (this.api.scrollTabIntoView) {
      this.$timeout(() => this.api.scrollTabIntoView(index), this.TIME_TO_WAIT);
    }
  }
};

angular.module('app')
  .service('TabManagerService', TabManagerService);

})();

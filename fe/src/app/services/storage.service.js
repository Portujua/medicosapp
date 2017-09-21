(() => {

class StorageService {
  constructor(CacheFactory, APP_INFO) {
    let appName = APP_INFO.name.replace(/ /g, '-').toLowerCase(),
        localName =  `${appName}.local-storage`,
        sessionName = `${appName}.session-storage`;

    // Local cache
    this._localCache = CacheFactory.createCache(localName, { storageMode: 'localStorage' });
    // Session cache
    this._sessionCache = CacheFactory.createCache(sessionName, { storageMode: 'sessionStorage' });
  }

  /**
   * Check if session or local storage
   * @param  {String}  type
   * @return {Boolean}
   */
  _isSession(type) {
    return !_(type).isEmpty() && (type.toLowerCase() === 'session' || type.toLowerCase() === 's');
  }

  /**
   * get
   * @param  {String} key
   * @param  {Object} storageType
   * @return {Object}
   */
  get(key, storageType) {
    if (this._isSession(storageType)) {
      return this._sessionCache.get(key);
    }

    return this._localCache.get(key);
  }

  /**
   * put
   * @param  {String} key
   * @param  {Object} value
   * @param  {Object} storageType
   * @return {Object}
   */
  put(key, value, storageType) {
    if (this._isSession(storageType)) {
      return this._sessionCache.put(key, value);
    }

    return this._localCache.put(key, value);
  }

  /**
   * remove
   * @param  {String} key
   * @param  {Object} storageType
   * @return {Object}
   */
  remove(key, storageType) {
    if (this._isSession(storageType)) {
      return this._sessionCache.remove(key);
    }

    return this._localCache.remove(key);
  }

  /**
   * clear
   * @param  {Object} storageType
   */
  clear(storageType) {
    if (this._isSession(storageType)) {
      this._sessionCache.removeAll();
    }

    this._localCache.removeAll();
  }

  /**
   * info
   * @param  {Object} storageType
   * @return {Object}
   */
  info(storageType) {
    if (this._isSession(storageType)) {
      return this._sessionCache.info();
    }

    return this._localCache.info();
  }
};

angular.module('app')
  .service('StorageService', StorageService);

})();

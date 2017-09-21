class BaseFactory {
  constructor(data) {
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
         this[key] = data[key];
      }
    }
  }

  postPayload() {
    throw Error('Method not implemented.');
  }

  putPayload() {
    throw Error('Method not implemented.');
  }

  getPayload(method = 'post') {
    return method === 'post' ? this.postPayload() : this.putPayload();
  }
}

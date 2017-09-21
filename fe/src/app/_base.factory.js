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

  __flatten(input) {
    // Ignore things that aren't objects.
    if (typeof input !== 'object') {
      return input;
    }
    let length = 0;

    // It's an object or array
    for (let key in input) {
      // Just for own properties
      if (!input.hasOwnProperty(key)) {
        continue;
      }

      length++;

      let value = input[key];
      // If the value is another array or object, recursive call
      if (typeof value === 'object') {
        // Recurse into object
        let res = this.__flatten(value);

        if (res === null) {
          length--;
          delete input[key];
        }
      } else if (key !== 'id') {
        // Delete the property only if:
        // - the key name === "id"
        // - The value has a property call "id" (to avoid delete
        //   objects or array like: "www: { foo: true }" or "www: ['Value1', 'Value2']")
        length--;
        delete input[key];
      }
    }

    return length > 0 ? input : null;
  }

  simplify(input) {
    let copy = JSON.parse(JSON.stringify(input));
    return this.__flatten(copy);
  }

  toObject() {
    return this.getObject();
  }

  getObject() {
    let ret = {};

    for (let key in this) {
      if (this.hasOwnProperty(key)) {
         ret[key] = this[key];
      }
    }
    return ret;
  }
}

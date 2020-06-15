export default class LIFOCache {
  // LIFOCache class

  constructor() {
    //initialize
    this.cache_data = {};
    this.key_list = [];
    this.result = [];
  }
  /*
    get(key){
        // Get an item by key
        return this.cache_data[key] || None
    }
*/
  pop_lifo() {
    // Pop item LIFO

    const x = this.key_list.pop();
    const y = this.cache_data[x];
    delete this.cache_data.x;
    return { x: y };
  }

  put(key, item) {
    // Add an item in the cache according LIFO Algorithm

    if (!key || !item) {
      return false;
    }
    if (key in this.key_list) {
      const i = this.key_list.indexOf(key);
      this.key_list.splice(i, 1);
    }
    this.cache_data[key] = item;
    this.key_list.push(key);
  }
}

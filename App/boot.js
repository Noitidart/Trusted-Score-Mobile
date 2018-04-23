// @flow

// add .last to array so can do arr.last
// returns undefined if it doesnt have a last. this matches behavior of Array.prototype.pop() which returns undefined when its empty
Object.defineProperty(Array.prototype, 'last', {
    get: function() {
        return this.length ? this[this.length-1] : undefined;
    }
});

// this makes array.push return itself
Array.prototype.pushReturn = function(...elements) {
    this.push(...elements);
    return this;
}

// // // set key/value pair and returns itself
Object.assignOne = function(obj, key, value) {
    obj[key] = value;
    return obj;
}

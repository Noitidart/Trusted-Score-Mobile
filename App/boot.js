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


// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
}

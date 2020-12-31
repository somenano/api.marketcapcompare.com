Object.defineProperty(Date.prototype, 'YYYYMMDDHH', {
    value: function() {
        function pad2(n) {  // always returns a string
            return (n < 10 ? '0' : '') + n;
        }
  
        return this.getFullYear() +
               pad2(this.getMonth() + 1) + 
               pad2(this.getDate()) +
               pad2(this.getHours())
    }
  });

Object.defineProperty(Date.prototype, 'time_bucket', {
    value: function() {
        function pad2(n) {  // always returns a string
            return (n < 10 ? '0' : '') + n;
        }
  
        return this.getFullYear() + '-' +
               pad2(this.getMonth() + 1) + '-' + 
               pad2(this.getDate()) + ' ' +
               pad2(this.getHours()) + ':'
    }
  });


exports.getTimeIdentifier = function(time_bucket, symbol) {
    return '' + time_bucket + '-' + symbol.toLowerCase();
}

exports.array_of_obj_to_obj = function(array, key) {
    let obj = {};
    for (let el of array) {
        obj[el[key]] = el;
    }
    return obj;
}

exports.hours_from_now = function(hours) {
    let d = new Date();
    d.setHours(d.getHours() + hours);
    return d;
}
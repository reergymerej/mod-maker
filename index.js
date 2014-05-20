'use strict';

var mod = function (foo) {

    var i,
        values = {};

    if (!foo || foo.constructor.name !== 'Object') {
        throw new Error('an object is required');
    }

    // create private references
    for (i in foo) {
        if (foo.hasOwnProperty(i)) {
            values[i] = foo[i];
        }
    }

    return {
        get: function (prop) {
            return values[prop];
        },
        set: function (prop, val) {
            values[prop] = val;
        }
    };
};

exports.mod = mod;
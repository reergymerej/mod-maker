'use strict';

var TYPES = {
    String: 1,
    Number: 1,
    Boolean: 1,
    Function: 1,
    Array: 1,
    Object: 1,
    null: 1,
    NaN: 1,
    undefined: 1
};

var getType = function (x) {
    var type;

    if (x === null || x === undefined) {
        type = x;
    } else if (x.name) {
        type = x.name;
    } else {
        type = (x).constructor.name;
    }

    return type;
};

var mod = function (foo) {

    var i,
        values = {},
        type;

    if (!foo || foo.constructor.name !== 'Object') {
        throw new Error('an object is required');
    }

    // create private references
    for (i in foo) {
        if (foo.hasOwnProperty(i)) {
            type = getType(foo[i]);

            values[i] = {
                type: type,
                initial: !(TYPES.hasOwnProperty(type)) ? foo[i] : undefined,
                value: foo[i]
            };
        }
    }

    return {
        get: function (prop) {
            return JSON.parse(JSON.stringify(values[prop].value));
        },
        set: function (prop, val) {
            var type = getType(val);

            if (type === values[prop].type) {
                values[prop].value = val;
            } else {
                throw new Error(val + ' should be a ' + type);
            }
        },
        debug: function () {
            for (var i in values) {
                console.log(values[i]);
            }
        },
        field: function (prop) {
            return  values[prop];
        }
    };
};

exports.mod = mod;
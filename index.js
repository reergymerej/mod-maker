'use strict';

var TYPES = [
    String,
    Number,
    Boolean,
    Function,
    Array,
    Object,
    null,
    NaN,
    undefined
];

var TYPE_NAMES = {
    'Number': 1,
    'String': 1,
    'Boolean': 1,
    'Function': 1,
    'Array': 1,
    'Object': 1
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
        type,
        initial,
        anonymousFn,
        isConstructor;

    if (!foo || foo.constructor.name !== 'Object') {
        throw new Error('an object is required');
    }

    // create private references
    for (i in foo) {
        if (foo.hasOwnProperty(i)) {
            type = getType(foo[i]);
            initial = undefined;
            anonymousFn = false;
            isConstructor = false;

            if (TYPES.indexOf(foo[i]) === -1) {
                // Check for a function.
                if (typeof foo[i] === 'function') {
                    if (type === 'Function') {
                        anonymousFn = true;
                    } else {
                        isConstructor = type[0] === type[0].toUpperCase();
                    }
                } else {
                    // An initial value was provided.
                    initial = foo[i];
                }
            } else {
                isConstructor = true;
            }

            values[i] = {
                type: type,
                initial: initial,
                value: foo[i],
                anonymousFn: anonymousFn,
                isConstructor: isConstructor
            };
        }
    }

    return {
        get: function (prop) {
            if (typeof values[prop].value === 'function') {
                return values[prop].value();
            }

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
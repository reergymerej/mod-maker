# Mod Maker
A utility to make modules with controlled variables.

## Example

```javascript
// import the package
var mm = require('mod-maker');

// create a POJO
var foo = {
    bar: true,
    baz: 123
};

// convert it to a module
var fooModule = mm.mod(foo);

// The properties are hidden.
fooModule.bar;  // undefined
fooModule.baz;  // undefined

// Use get/set to access the values.
fooModule.get('bar');  // true
fooModule.set('bar', false);
fooModule.get('bar');  // false
```
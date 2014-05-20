/* jshint expr: true */

var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    mm = require('../index');

describe('mod', function () {
    var foo;

    beforeEach(function () {
        foo = {
            a: String,
            b: Number,
            c: Boolean,
            d: null,
            e: NaN,
            f: Function,
            g: Array,
            h: Object,
            i: 'asdf',
            j: 123,
            k: true,
            l: function () {},
            m: [1, 2, 3],
            n: { foo: 'bar' }
        };
    });

    it('should throw an error when not given an object', function () {
        expect(mm.mod).to.throw(Error);
    });

    it('should return an object', function () {
        expect(typeof mm.mod(foo)).to.equal('object');
    });

    describe('the returned module', function () {
        var mod;

        beforeEach(function () {
            mod = mm.mod(foo);
        });

        it('should should hide all the initial properties', function () {
            expect(mod.i).not.to.exist;
        });

        it('should provide getters for the properties', function () {
            expect(mod.get('i')).to.equal(foo.i);
        });

        it('should provide setters for the properties', function () {
            mod.set('i', 'bar');
            expect(mod.get('i')).to.equal('bar');
        });
    });
});
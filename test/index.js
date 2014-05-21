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
            n: { foo: 'bar' },
            o: function SomeThing () {},
            p: undefined
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

        it('should not return values by reference', function () {
            var m = mod.get('m').splice(1,1);
            expect(mod.get('m')).to.include.members([1, 2, 3]);
        });

        it('should provide setters for the properties', function () {
            mod.set('i', 'bar');
            expect(mod.get('i')).to.equal('bar');
        });

        describe('validation', function () {
            it('should throw an error when setting the wrong type', function () {
                expect(function () {
                    mod.set('a', 1234);
                }).to.throw(Error);
            });
        });

        describe('field data', function () {
            it('should be available through "field"', function () {
                expect(mod.field('j')).to.eql({
                    type: 'Number',
                    initial: 123,
                    value: 123
                });
            });

            describe('types', function () {
                describe('identifying from constructors', function () {
                    it('should work for String', function () {
                        expect(mod.field('a').type).to.equal('String');
                    });

                    it('should work for Number', function () {
                        expect(mod.field('b').type).to.equal('Number');
                    });

                    it('should work for Boolean', function () {
                        expect(mod.field('c').type).to.equal('Boolean');
                    });

                    it('should work for Function', function () {
                        expect(mod.field('f').type).to.equal('Function');
                    });

                    it('should work for Array', function () {
                        expect(mod.field('g').type).to.equal('Array');
                    });

                    it('should work for Object', function () {
                        expect(mod.field('h').type).to.equal('Object');
                    });

                    it('should work for anonymous functions', function () {
                        expect(mod.field('l').type).to.equal('Function');
                    });

                    it('should work for named functions', function () {
                        expect(mod.field('o').type).to.equal('SomeThing');
                    });
                });

                describe('identifying from literals', function () {
                    it('should work for null', function () {
                        expect(mod.field('d').type).to.equal(null);
                    });

                    it('should work for NaN', function () {
                        expect(mod.field('e').type).to.equal('Number');
                    });

                    it('should work for undefined', function () {
                        expect(mod.field('p').type).to.equal(undefined);
                    });

                    it('should work for strings', function () {
                        expect(mod.field('i').type).to.equal('String');
                    });

                    it('should work for numbers', function () {
                        expect(mod.field('j').type).to.equal('Number');
                    });

                    it('should work for booleans', function () {
                        expect(mod.field('k').type).to.equal('Boolean');
                    });

                    it('should work for arrays', function () {
                        expect(mod.field('m').type).to.equal('Array');
                    });

                    it('should work for objects', function () {
                        expect(mod.field('n').type).to.equal('Object');
                    });
                });
            });

            describe('initial values', function () {
                describe('when specifying only a type', function () {
                    it('String should set no initial value', function () {
                        expect(mod.field('a').type).to.equal(undefined);
                    });

                    it('Number should set no initial value', function () {
                        expect(mod.field('b').type).to.equal(undefined);
                    });

                    it('Boolean should set no initial value', function () {
                        expect(mod.field('c').type).to.equal(undefined);
                    });

                    it('Function should set no initial value', function () {
                        expect(mod.field('f').type).to.equal(undefined);
                    });

                    it('Array should set no initial value', function () {
                        expect(mod.field('g').type).to.equal(undefined);
                    });

                    it('Object should set no initial value', function () {
                        expect(mod.field('h').type).to.equal(undefined);
                    });

                    it('anonymous functions should set no initial value', function () {
                        expect(mod.field('l').type).to.equal(undefined);
                    });

                    it('named functions should set no initial value', function () {
                        expect(mod.field('o').type).to.equal(undefined);
                    });                 
                });
            });
        });
    });
});
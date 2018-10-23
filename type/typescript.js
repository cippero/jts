var sum = function (a, b) {
    return a + b;
};
console.log(sum(3, 5));
/* TYPES */
// boolean
var isPending = true;
// number
var age = 57;
// string
var greeting = "hello";
var quote = "I'm only " + age + " years old!";
// array
var pets = ['cat', 'dog', 'chameleon'];
var pets2 = ['dragon', 'kraken'];
// object
var wizard = { name: 'John' };
// undefined & null
var meh = undefined;
var noo = null;
// tuple
var basket;
basket = ['apples', 5];
// enum
var Size;
(function (Size) {
    Size[Size["Small"] = 1] = "Small";
    Size[Size["Medium"] = 2] = "Medium";
    Size[Size["Large"] = 3] = "Large";
})(Size || (Size = {}));
;
var sizeName = Size[2];
var sizeNum = Size.Small;
// any
var whatever = 'noooo';
whatever = Size.Large;
whatever = 5;
// void
var sing = function () {
    console.log('lalala');
};
// never
var error = function () {
    throw Error('oops!');
};
;
var fightRobotArmy = function (robots) {
    console.log('fight!');
};
var fightRobotArmy2 = function (robots) {
    console.log('fight!');
};
fightRobotArmy({ count: 5, type: 'sword' });
;
var dog = {};
dog.count;
// class
var Animal = /** @class */ (function () {
    function Animal(sound) {
        this.mane = true;
        this.sing = 'lalala';
        this.sing = sound;
    }
    Animal.prototype.greet = function () {
        return "Hello " + this.sing;
    };
    return Animal;
}());
var lion = new Animal('RAAAAWWWWR');
lion.greet();
lion.sing;
// union
var confused = 5;

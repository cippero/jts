// boolean
const isPending: boolean = true;

// number
const age: number = 57;

// string
const greeting: string = "hello";
const quote: string = `I'm only ${age} years old!`;

// array
const pets: string[] = ['cat', 'dog', 'chameleon'];
const pets2: Array<string> = ['dragon', 'kraken'];

// object
const wizard: object = {name: 'John'};

// undefined & null
const meh: undefined = undefined;
const noo: null = null;

// tuple
let basket: [string, number];
basket = ['apples', 5];

// enum
enum Size {Small = 1, Medium = 2, Large = 3};
const sizeName: string = Size[2];
const sizeNum: number = Size.Small;

// any
let whatever: any = 'noooo';
whatever = Size.Large;
whatever = 5;

// void
const sing = (): void => {
    console.log('lalala');
}

// never
const error = (): never => {
    throw Error('oops!');
}

// interface
interface RobotArmy {
    count: number,
    type: string,
    magic?: string // ? signifies optional property
};
const fightRobotArmy = (robots: RobotArmy): void => {
    console.log('fight!');
}
const fightRobotArmy2 = (robots: {count: number, type: string, magic: string}): void => {
    console.log('fight!');
}

fightRobotArmy({count: 5, type: 'sword'});

// type assertions
interface CatArmy {
    count: number,
    type: string,
    magic: string
};

const dog = {} as CatArmy;
dog.count;

// class
class Animal {
    private mane: boolean = true;
    public sing: string = 'lalala';
    constructor(sound: string) {
        this.sing = sound
    }

    greet(): string {
        return `Hello ${this.sing}`
    }
}
const lion = new Animal('RAAAAWWWWR');
lion.greet();
lion.sing

// union
const confused: string | number | boolean = 5;

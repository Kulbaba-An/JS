class Square {
    constructor(a) {
        this.a = a;
    }

    static help() {
        console.log("Square: a quadrilateral with four equal sides and four right angles.");
    }

    length() {
        console.log("Perimeter:", 4 * this.a);
    }

    square() {
        console.log("Area:", this.a * this.a);
    }

    info() {
        console.log("Square info:");
        console.log("Sides:", this.a, this.a, this.a, this.a);
        console.log("Angles:", 90, 90, 90, 90);
        this.length();
        this.square();
    }
}
class Rectangle extends Square {
    constructor(a, b) {
        super(a);
        this.b = b;
    }

    static help() {
        console.log("Rectangle: opposite sides are equal, all angles are 90°.");
    }

    length() {
        console.log("Perimeter:", 2 * (this.a + this.b));
    }

    square() {
        console.log("Area:", this.a * this.b);
    }

    info() {
        console.log("Rectangle info:");
        console.log("Sides:", this.a, this.b, this.a, this.b);
        console.log("Angles:", 90, 90, 90, 90);
        this.length();
        this.square();
    }

    // getters setters (бо Parallelogram буде від Rhombus)
    get sideA() {
        return this.a;
    }

    set sideA(value) {
        this.a = value;
    }

    get sideB() {
        return this.b;
    }

    set sideB(value) {
        this.b = value;
    }
}
class Rhombus extends Square {
    constructor(a, alpha, beta) {
        super(a);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("Rhombus: all sides equal, opposite angles equal.");
    }

    length() {
        console.log("Perimeter:", 4 * this.a);
    }

    square() {
        let area = this.a * this.a * Math.sin(this.alpha * Math.PI / 180);
        console.log("Area:", area);
    }

    info() {
        console.log("Rhombus info:");
        console.log("Sides:", this.a, this.a, this.a, this.a);
        console.log("Angles:", this.alpha, this.beta, this.alpha, this.beta);
        this.length();
        this.square();
    }
}
class Parallelogram extends Rhombus {
    constructor(a, b, alpha, beta) {
        super(a, alpha, beta);
        this.b = b;
    }

    static help() {
        console.log("Parallelogram: opposite sides parallel and equal.");
    }

    length() {
        console.log("Perimeter:", 2 * (this.a + this.b));
    }

    square() {
        let area = this.a * this.b * Math.sin(this.alpha * Math.PI / 180);
        console.log("Area:", area);
    }

    info() {
        console.log("Parallelogram info:");
        console.log("Sides:", this.a, this.b, this.a, this.b);
        console.log("Angles:", this.alpha, this.beta, this.alpha, this.beta);
        this.length();
        this.square();
    }
}
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

let sq = new Square(5);
let rect = new Rectangle(4, 6);
let rh = new Rhombus(5, 120, 60);
let par = new Parallelogram(4, 7, 120, 60);

sq.info();
rect.info();
rh.info();
par.info();
function Triangular(a = 3, b = 4, c = 5) {
    return { a, b, c };
}
let t1 = Triangular();
let t2 = Triangular(5, 6, 7);
let t3 = Triangular(8, 9, 10);

console.log(t1);
console.log(t2);
console.log(t3);

function PiMultiplier(num) {
    return function () {
        return Math.PI * num;
    }
}

let mul2 = PiMultiplier(2);
let mul3_2 = PiMultiplier(3/2);
let div2 = PiMultiplier(0.5);

console.log(mul2());
console.log(mul3_2());
console.log(div2());

//================================================================

function Painter(color) {
    return function(obj) {
        if ("type" in obj) {
            console.log(`${color} ${obj.type}`);
        } else {
            console.log("No 'type' property occurred!");
        }
    }
}
let PaintBlue = Painter("Blue");
let PaintRed = Painter("Red");
let PaintYellow = Painter("Yellow");
let obj1 = {
    maxSpeed: 280,
    type: "Sportcar",
    color: "magenta"
};

let obj2 = {
    type: "Truck",
    avgSpeed: 90,
    loadCapacity: 2400
};

let obj3 = {
    maxSpeed: 180,
    color: "purple",
    isCar: true
};
PaintBlue(obj1);
PaintRed(obj2);
PaintYellow(obj3);
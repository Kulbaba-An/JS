let car1 = new  Object({
    color : "red",
    maxSpeed : 100,
    driver : new Object({
        name : "A B",
        category: "C",
        ["personal limitations"] : "No driving at night" 
    }),
    tunning : true,
    ["number of accidents"] : 0
});


let car2 = {
    color : "leek green",
    maxSpeed : 130,
    driver : new Object({
        name : "C D",
        category: "B",
        ["personal limitations"] : null 
    }),
    tunning : false,
    ["number of accidents"] : 2
};
//-----------------------------------------------------------

car1.drive = "I am not driving at night";
car2.drive = "I can drive anytime";
console.log(car1);

class Truck{

    constructor(color, weight, avgSpeed, brand, model){
        this.color = color;
        this.weight = weight;
        this.avgSpeed = avgSpeed;
        this.brand = brand;
        this.model = model;
    }

    trip(){

        if (!('driver' in this)) {
            console.log("No driver assigned");
            return;
        }

        let message = `Driver ${this.driver.name} `;

        if(this.driver.nightDriving){
            message += "drives at night ";
        }
        else{
            message += "does not drive at night ";
        }

        message += `and has ${this.driver.experience} years of experience`;

        console.log(message);
    }

    AssignDriver(name,nightDriving,experience){
        this.driver = {
            name: name,
            nightDriving: nightDriving,
            experience: experience
        };
    }
}

let truck1 = new Truck("crimson orange",35,80, "Volvo", "Some model");
truck1.AssignDriver("A B",true,15);

let truck2 = new Truck("crimson orange",35,80, "Volvo", "Some model");
truck2.AssignDriver("C D",false,24);

truck1.trip();
truck2.trip();
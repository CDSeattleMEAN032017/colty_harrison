function VehicleConstructor(name, num_wheels, num_passengers, speed) {
    var _this = this;
    this.name = name;
    this.num_wheels = num_wheels;
    this.num_passengers = num_passengers;
    this.speed = speed;
    var createVin = function() {
        char_set = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        vin = "";
        for (var i = 0; i < 17; i++) {
            vin += char_set[Math.floor(Math.random() * 36)];
        }
        return vin;
    };
    this.vin = createVin();
    this.distance_travelled = 0;
}

VehicleConstructor.prototype.move = function() {
    this.distance_travelled();
    this.makeNoise();
};
VehicleConstructor.prototype.checkMiles = function() {
    console.log(this.distance_travelled);
};
VehicleConstructor.prototype.updateDistanceTravelled = function() {
    this.distance_travelled += this.speed;
};

VehicleConstructor.prototype.createVin = function() {
    this.vin = Math.floor(Math.random() * 100000000000000000);
};
VehicleConstructor.prototype.makeNoise = function() {
    console.log('noise!');
};

var bike = new VehicleConstructor('Bike', 2, 1, 5);
bike.makeNoie = function() {
    console.log('ring ring!');
};

var sedan = new VehicleConstructor('Sedan', 4, 4, 20);
sedan.makeNoise = function() {
    console.log('Honk! Honk!');
    console.log(sedan.vin);
};


var bus = new VehicleConstructor('Bus', 6, 10, 10);
bus.add_passengers = function(num) {
    bus.num_passengers += num;
};

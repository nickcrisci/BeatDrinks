let Shape = function(x, y) {
    this.x = x;
    this.y = y;
    //return { z: x + y }
}

/* what new actually does with the Shape-function */
function newSimulator(...args) {
    let obj = {};
    // obj ProtoTYPE to different ProtoTYPE
    Object.setPrototypeOf(
        obj,
        Shape.prototype
    )
    // calls Shape for obj and checks for return in Shape
    let res = Shape.call(obj, ...args);
    if (res !== null && typeof res === 'object')
        return res;
    return obj;
}

let myShape = new Shape(5, 10);
let myShapeWithoutNew = Shape(5, 10);
let mySimulatedShape = newSimulator(5, 10);
console.log(myShape);
console.log(myShapeWithoutNew);
console.log(mySimulatedShape);
console.log(''+ Shape.prototype);
console.log(typeof myShape);
console.log(typeof myShapeWithoutNew);
console.log(typeof mySimulatedShape);
//Global Variables
let firstOperand;
let operator;
let secondOperand;

//Functions
function add(firstAddend, secondAddend){
    return firstAddend + secondAddend;
}

function subtract(minuend, subtrahend){
    return minuend - subtrahend;
}

function multiply(multiplicand, multiplier){
    return multiplicand * multiplier;
}

function divide(dividend, divisor){
    return dividend / divisor;
}

function operate(firstNum, operation, secondNum){
    switch(operation){
        case "add":
            return add(firstNum, secondNum);
        case "subtract":
            return subtract(firstNum, secondNum);
        case "multiply":
            return multiply(firstNum, secondNum);
        default:
            return divide(firstNum, secondNum);
    }
}
//Global DOM References
const previousOperation = document.querySelector("#previous-operation");
const output = document.querySelector("#active-output");
const digits = document.querySelector(".digits");
const operators = document.querySelector(".operators");

//Global Constants
const EQUALS_ID = "equals";
const ADD_ID = "addition";
const SUBTRACT_ID = "subtraction";
const MULTIPLY_ID = "multiplication";
const DIVIDE_ID = "division";

//Global Variables
let firstOperand = '';
let secondOperand = '';
let operatorId = '';
let operatorSymbol = '';
let result = '';

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
        case ADD_ID:
            result = add(firstNum, secondNum);
            break;
        case SUBTRACT_ID:
            result = subtract(firstNum, secondNum);
            break;
        case MULTIPLY_ID:
            result = multiply(firstNum, secondNum);
            break;
        case DIVIDE_ID:
            result = divide(firstNum, secondNum);
    }
    display(result);
}

function display(newText){
    if(operatorId === ''){
        firstOperand += newText;
        output.textContent = firstOperand;
    }
    else if(result === ''){
        secondOperand += newText;
        output.textContent = `${firstOperand} ${operatorSymbol} ${secondOperand}`;
    }
    else{
        previousOperation.textContent = output.textContent;
        output.textContent = newText;
    }
}

function clear(){
    firstOperand = '';
    secondOperand = '';
    operatorId = '';
    operatorSymbol = '';
    result = '';
    previousOperation.textContent = '';
    output.textContent = '';
}

//Event Listeners
digits.addEventListener("click", (event) => {
    display(event.target.textContent);
});

operators.addEventListener("click", (event) => {
    if(event.target.id === EQUALS_ID){
        firstOperand = +firstOperand;
        secondOperand = +secondOperand;
        operate(firstOperand, operatorId, secondOperand);
    }
    else if(secondOperand === ''){
        operatorId = event.target.id;
        operatorSymbol = event.target.textContent;
    }
});

//Global DOM References
const previousOperation = document.querySelector("#previous-operation");
const output = document.querySelector("#active-output");
const digits = document.querySelector(".digits");
const operators = document.querySelector(".operators");

//Global Constants
const EQUALS = "equals";
const ADDITION = "&plus;";
const SUBTRACTION = "&minus;";
const MULTIPLICATION = "&times;";
const DIVISION = "&divide;";

//Global Variables
let firstOperand = '';
let secondOperand = '';
let operator = '';
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
        case ADDITION:
            return add(firstNum, secondNum);
        case SUBTRACTION:
            return subtract(firstNum, secondNum);
        case MULTIPLICATION:
            return multiply(firstNum, secondNum);
        case DIVISION:
            return divide(firstNum, secondNum);
    }
}

function display(newText){
    if(operator === ''){
        firstOperand += newText;
        output.textContent = firstOperand;
    }
    else if(result === ''){
        secondOperand += newText;
        output.textContent = `${firstOperand} ${operator} ${secondOperand}`;
    }
    else output.text
}

//Event Listeners
digits.addEventListener("click", (event) => {
    display(event.target.textContent);
});

operators.addEventListener("click", (event) => {
    if(event.target.id === EQUALS){
        firstOperand = +firstOperand;
        secondOperand = +secondOperand;
        operate(firstOperand, operator, secondOperand);
    }
    else if(secondOperand === '') operator = event.target.textContent;
});

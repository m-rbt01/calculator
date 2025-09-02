//Global DOM References
const previousOperation = document.querySelector("#previous-operation");
const activeOutput = document.querySelector("#active-output");
const digitsContainer = document.querySelector(".digits");
const operatorsContainer = document.querySelector(".operators");

//Global Constants
const EQUALS_ID = "equals";
const ADD_ID = "addition";
const SUBTRACT_ID = "subtraction";
const MULTIPLY_ID = "multiplication";
const DIVIDE_ID = "division";
const OPERATE_KEY = "operate";

//Global Variables
const operation = {
    firstOperand: '',
    secondOperand: '',
    id: '',
    symbol: '',
    result: '',
    operate(){
        this.firstOperand = +this.firstOperand;
        this.secondOperand = +this.secondOperand;
        switch(this.id){
            case ADD_ID:
                this.result = add(this.firstOperand, this.secondOperand);
                break;
            case SUBTRACT_ID:
                this.result = subtract(this.firstOperand, this.secondOperand);
                break;
            case MULTIPLY_ID:
                this.result = multiply(this.firstOperand, this.secondOperand);
                break;
            case DIVIDE_ID:
                this.result = divide(this.firstOperand, this.secondOperand);
        }
        display(previousOperation, activeOutput.textContent);
        display(activeOutput, this.result);
    }
};

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

function display(displayContainer, output){
    displayContainer.textContent = output;
}

function setOperation(clickEvent){
    let digitText = clickEvent.target.textContent;
    let newOutput;
    if(operation.id === ''){
        operation.firstOperand += digitText;
        newOutput = operation.firstOperand;
    }
    else{
        operation.secondOperand += digitText;
        newOutput = `${operation.firstOperand} ${operation.symbol} ${operation.secondOperand}`;
    }
    display(activeOutput, newOutput);
}

function evaluateOperation(clickEvent){
    let operator = clickEvent.target;
    if(operator.id === EQUALS_ID) operation.operate();
    else if(operation.secondOperand === ''){
        operation.id = operator.id;
        operation.symbol = operator.textContent;
        display(activeOutput, `${operation.firstOperand} ${operation.symbol}`);
    }
}

function clear(){
    for(let key in operation){
        if(key !== OPERATE_KEY) operation[key] = '';
    }
    previousOperation.textContent = '';
    activeOutput.textContent = '';
}

//Event Listeners
digitsContainer.addEventListener("click", setOperation);

operatorsContainer.addEventListener("click", evaluateOperation);

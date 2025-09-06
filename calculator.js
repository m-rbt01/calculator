//Global DOM References
const previousOperation = document.querySelector("#previous-operation");
const activeOutput = document.querySelector("#active-output");
const digitsContainer = document.querySelector(".digits");
const editContainer = document.querySelector(".edit");
const operatorsContainer = document.querySelector(".operators");

//Global Constants
const CLEAR_ID = "clear-calculator";
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
        if(!Number.isInteger(this.result)) this.result = this.result.toFixed(1);
    }
};

//Calculator Functions
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
    //scroll display to right
    const RIGHT_OFFSET = displayContainer.scrollWidth - displayContainer.clientWidth;
    displayContainer.scrollLeft = RIGHT_OFFSET;
}

function setOperands(clickEvent){
    let digitText = clickEvent.target.textContent;
    let operandOutput;
    if(operation.result !== '') clear(); //only reset calculator after a completed operation
    if(operation.id === ''){ //concatenate first operand if no operator is present
        operation.firstOperand += digitText;
        operandOutput = operation.firstOperand;
    }
    else{ //otherwise, concatenate the second operand
        operation.secondOperand += digitText;
        operandOutput = `${operation.firstOperand} ${operation.symbol} ${operation.secondOperand}`;
    }
    display(activeOutput, operandOutput);
}

function setOperator(operatorId, operatorSymbol){
    operation.id = operatorId;
    operation.symbol = operatorSymbol;
    display(activeOutput, `${operation.firstOperand} ${operation.symbol}`);
}

function evaluateOperation(clickEvent){
    let operator = clickEvent.target;
    if(operation.secondOperand !== ''){ //operate when both operands are present
        operation.operate();
        operation.firstOperand = operation.result;
        operation.secondOperand = '';
        display(previousOperation, activeOutput.textContent);
        display(activeOutput, operation.firstOperand);
    }
    if((operation.firstOperand !== '') && (operator.id !== EQUALS_ID)){
        operation.result = '';
        setOperator(operator.id, operator.textContent);
    }
}

function clear(){
    for(let key in operation){
        if(key !== OPERATE_KEY) operation[key] = '';
    }
    previousOperation.textContent = '';
    activeOutput.textContent = '';
}

function edit(clickEvent){
    let editId = clickEvent.target.id;
    if(editId === CLEAR_ID) clear();
}

//Event Listeners
digitsContainer.addEventListener("click", setOperands);
operatorsContainer.addEventListener("click", evaluateOperation);
editContainer.addEventListener("click", edit);

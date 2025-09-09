//Global DOM References
const previousOperation = document.querySelector("#previous-operation");
const activeOutput = document.querySelector("#active-output");
const digitsContainer = document.querySelector(".digits");
const editContainer = document.querySelector(".edit");
const operatorsContainer = document.querySelector(".operators");
const decimalButton = document.querySelector("#decimal");

//Global Constants
const OPERATE_KEY = "operate";
const FIRST_OP_KEY = "firstOperand";
const SECOND_OP_KEY = "secondOperand";
const DECIMAL_SYMBOL = '.';
const NEGATE_SYMBOL = '±';
const DIVIDE_SYMBOL = '÷';
const MULTIPLY_SYMBOL = '×';
const SUBTRACT_SYMBOL = '−';
const ADD_SYMBOL = '+';
const EQUALS_SYMBOL = '=';
const NEGATIVE_SYMBOL = '-';
const CLEAR_ID = "clear";
const BACKSPACE_ID = "backspace";
const MAX_DEC_POINTS = 5;

//Global Variables
const operation = {
    firstOperand: '',
    secondOperand: '',
    symbol: '',
    result: '',
    operate(){
        this.firstOperand = +this.firstOperand;
        this.secondOperand = +this.secondOperand;
        switch(this.symbol){
            case ADD_SYMBOL:
                this.result = add(this.firstOperand, this.secondOperand);
                break;
            case SUBTRACT_SYMBOL:
                this.result = subtract(this.firstOperand, this.secondOperand);
                break;
            case MULTIPLY_SYMBOL:
                this.result = multiply(this.firstOperand, this.secondOperand);
                break;
            case DIVIDE_SYMBOL:
                this.result = divide(this.firstOperand, this.secondOperand);
        }
        if((isFinite(this.result)) && (!Number.isInteger(this.result))) roundToMax(); //round only if floating-point result
        //reset operands
        this.firstOperand = this.result.toString();
        this.secondOperand = '';
        this.symbol = '';
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

function roundToMax(){
    const fractionalPart = operation.result.toString().split(DECIMAL_SYMBOL)[1];
    if(fractionalPart.length > MAX_DEC_POINTS) operation.result = parseFloat(operation.result.toFixed(MAX_DEC_POINTS));
}

function display(displayContainer, output){
    displayContainer.textContent = output;
    //scroll display to right
    const RIGHT_OFFSET = displayContainer.scrollWidth - displayContainer.clientWidth;
    displayContainer.scrollLeft = RIGHT_OFFSET;
}

function negateOperand(operandKey){
    if(operation[operandKey][0] === NEGATIVE_SYMBOL){
        operation[operandKey] = operation[operandKey].substring(1);
    }
    else if(operation[operandKey].length > 0){
        operation[operandKey] = NEGATIVE_SYMBOL + operation[operandKey];
    }
}

function setOperands(digitString){
    let operandOutput;
    //reset calculator after a completed operation or divide by zero attempt
    if(operation.result !== '') clear(); 
    if(operation.symbol === ''){ //concatenate first operand if no operator is present
        (digitString === NEGATE_SYMBOL) ? negateOperand(FIRST_OP_KEY) : operation.firstOperand += digitString;
        operandOutput = operation.firstOperand;
    }
    else{ //otherwise, concatenate the second operand
        (digitString === NEGATE_SYMBOL) ? negateOperand(SECOND_OP_KEY) : operation.secondOperand += digitString;
        operandOutput = `${operation.firstOperand} ${operation.symbol} ${operation.secondOperand}`;
    }
    display(activeOutput, operandOutput);
}

function setOperator(operatorString){
    decimalButton.disabled = false;
    operation.symbol = operatorString;
    display(activeOutput, `${operation.firstOperand} ${operation.symbol}`);
}

function evaluateOperation(operatorString){
    if(operation.secondOperand.length > 0){ //operate when both operands are present
        operation.operate();
        decimalButton.disabled = false;
        display(previousOperation, activeOutput.textContent);
        display(activeOutput, operation.firstOperand);
    }
    //set new operator only when not equals, and first operand is valid
    if((operatorString !== EQUALS_SYMBOL) && (operation.firstOperand.length > 0 && isFinite(operation.firstOperand))){
        operation.result = '';
        setOperator(operatorString);
    }
}

function clear(){
    for(let key in operation){
        if(key !== OPERATE_KEY) operation[key] = '';
    }
    decimalButton.disabled = false;
    previousOperation.textContent = '';
    activeOutput.textContent = '';
}

function backspace(){
    let newOutput;
    if(operation.secondOperand.length > 0){ //backspace from second operand
        let secondArray = operation.secondOperand.split('');
        if(secondArray.pop() === DECIMAL_SYMBOL) decimalButton.disabled = false;
        operation.secondOperand = secondArray.join('');
        newOutput = `${operation.firstOperand} ${operation.symbol} ${operation.secondOperand}`;
    }
    else if(operation.symbol !== ''){ //backspace from operator
        operation.symbol = '';
        if(operation.firstOperand.includes(DECIMAL_SYMBOL)) decimalButton.disabled = true;
        newOutput = operation.firstOperand;
    }
    else{ //backspace from first operand
        let firstArray = operation.firstOperand.split('');
        if(firstArray.pop() === DECIMAL_SYMBOL) decimalButton.disabled = false;
        operation.firstOperand = firstArray.join('');
        newOutput = operation.firstOperand;
    }
    display(activeOutput, newOutput);
}

function edit(editId){
    if(activeOutput.textContent !== '') (editId === CLEAR_ID) ? clear() : backspace();
}

//Event Listeners
digitsContainer.addEventListener("click", (event) => {
    if(event.target instanceof HTMLButtonElement){
        if(event.target === decimalButton) decimalButton.disabled = true;
        setOperands(event.target.textContent);
    }
});
operatorsContainer.addEventListener("click", (event) => {
    if(event.target instanceof HTMLButtonElement) evaluateOperation(event.target.textContent);
});
editContainer.addEventListener("click", (event) => {
    if(event.target instanceof HTMLButtonElement) edit(event.target.id);
});

//Global DOM References
const previousOperation = document.querySelector("#previous-operation");
const activeOutput = document.querySelector("#active-output");
const digitsContainer = document.querySelector(".digits");
const editContainer = document.querySelector(".edit");
const operatorsContainer = document.querySelector(".operators");
const decimalButton = document.querySelector("#decimal");

//Global Constants
const ADD_ID = "addition";
const SUBTRACT_ID = "subtraction";
const MULTIPLY_ID = "multiplication";
const DIVIDE_ID = "division";
const EQUALS_ID = "equals";
const NEGATE_ID = "negate";
const CLEAR_ID = "clear";
const BACKSPACE_ID = "backspace";
const MAX_DEC_POINTS = 5;
const OPERATE_KEY = "operate";
const FIRST_OP_KEY = "firstOperand";
const SECOND_OP_KEY = "secondOperand"; 
const NEGATIVE_SIGN = '-';

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
        if((isFinite(this.result)) && (!Number.isInteger(this.result))) roundToMax(); //round only if floating-point result
        //reset operands
        this.firstOperand = this.result.toString();
        this.secondOperand = '';
        this.id = '';
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
    const fractionalPart = operation.result.toString().split('.')[1];
    if(fractionalPart.length > MAX_DEC_POINTS) operation.result = parseFloat(operation.result.toFixed(MAX_DEC_POINTS));
}

function display(displayContainer, output){
    displayContainer.textContent = output;
    //scroll display to right
    const RIGHT_OFFSET = displayContainer.scrollWidth - displayContainer.clientWidth;
    displayContainer.scrollLeft = RIGHT_OFFSET;
}

function negateOperand(operandKey){
    if(operation[operandKey][0] === NEGATIVE_SIGN){
        operation[operandKey] = operation[operandKey].substring(1);
    }
    else if(operation[operandKey].length > 0){
        operation[operandKey] = NEGATIVE_SIGN + operation[operandKey];
    }
}

function setOperands(clickButton){
    let digitText = clickButton.textContent;
    let operandOutput;
    //reset calculator after a completed operation or divide by zero attempt
    if(operation.result !== '') clear(); 
    if(operation.id === ''){ //concatenate first operand if no operator is present
        (clickButton.id === NEGATE_ID) ? negateOperand(FIRST_OP_KEY) : operation.firstOperand += digitText;
        operandOutput = operation.firstOperand;
    }
    else{ //otherwise, concatenate the second operand
        (clickButton.id === NEGATE_ID) ? negateOperand(SECOND_OP_KEY) : operation.secondOperand += digitText;
        operandOutput = `${operation.firstOperand} ${operation.symbol} ${operation.secondOperand}`;
    }
    display(activeOutput, operandOutput);
}

function setOperator(operatorId, operatorSymbol){
    decimalButton.disabled = false;
    operation.id = operatorId;
    operation.symbol = operatorSymbol;
    display(activeOutput, `${operation.firstOperand} ${operation.symbol}`);
}

function evaluateOperation(operator){
    if(operation.secondOperand.length > 0){ //operate when both operands are present
        operation.operate();
        decimalButton.disabled = false;
        display(previousOperation, activeOutput.textContent);
        display(activeOutput, operation.firstOperand);
    }
    //set new operator only when not equals, and first operand is valid
    if((operator.id !== EQUALS_ID) && (operation.firstOperand.length > 0)){
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

function backspace(){
    let newOutput;
    if(operation.secondOperand.length > 0){
        let secondArray = operation.secondOperand.split('');
        secondArray.pop();
        operation.secondOperand = secondArray.join('');
        newOutput = `${operation.firstOperand} ${operation.symbol} ${operation.secondOperand}`;
    }
    else if(operation.id !== ''){
        operation.id = '';
        operation.symbol = '';
        newOutput = operation.firstOperand;
    }
    else{
        let firstArray = operation.firstOperand.split('');
        firstArray.pop();
        operation.firstOperand = firstArray.join('');
        newOutput = operation.firstOperand;
    }
    display(activeOutput, newOutput);
}

function edit(editButton){
    let editId = editButton.id;
    (editId === CLEAR_ID) ? clear() : backspace();
}

//Event Listeners
digitsContainer.addEventListener("click", (event) => {
    if(!(event.target instanceof HTMLButtonElement)) return;
    if(event.target === decimalButton) decimalButton.disabled = true;
    setOperands(event.target);
});
operatorsContainer.addEventListener("click", (event) => {
    if(!(event.target instanceof HTMLButtonElement)) return;
    evaluateOperation(event.target);
});
editContainer.addEventListener("click", (event) => {
    if(!(event.target instanceof HTMLButtonElement)) return;
    if(activeOutput.textContent !== '') edit(event.target);
});

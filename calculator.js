//GLOBAL DOM REFERENCES
const previousOperation = document.querySelector("#previous-operation");
const activeOutput = document.querySelector("#active-output");
const digitsContainer = document.querySelector(".digits");
const editContainer = document.querySelector(".edit");
const operatorsContainer = document.querySelector(".operators");

//GLOBAL CONSTANTS
const OPERATE_KEY = "operate";
const FIRST_OP_KEY = "firstOperand";
const SECOND_OP_KEY = "secondOperand";
const OP_SYMBOL_KEY = "symbol";
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
const DIGIT_KEYBOARD = "0123456789.";
const OPERATOR_KEYBOARD = {
    '/': DIVIDE_SYMBOL,
    '*': MULTIPLY_SYMBOL,
    '-': SUBTRACT_SYMBOL,
    '+': ADD_SYMBOL,
    '=': EQUALS_SYMBOL,
    "Enter": EQUALS_SYMBOL
};
const EDIT_KEYBOARD = {
    "Delete": CLEAR_ID,
    "Escape": CLEAR_ID,
    "Backspace": BACKSPACE_ID 
};

//GLOBAL VARIABLES
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
                this.result = this.firstOperand + this.secondOperand;
                break;
            case SUBTRACT_SYMBOL:
                this.result = this.firstOperand - this.secondOperand;
                break;
            case MULTIPLY_SYMBOL:
                this.result = this.firstOperand * this.secondOperand;
                break;
            case DIVIDE_SYMBOL:
                this.result = this.firstOperand / this.secondOperand;
        }
        if((isFinite(this.result)) && (!Number.isInteger(this.result))) roundToMax(); //round only if floating-point result
        //reset operation
        this.firstOperand = this.result.toString();
        this.secondOperand = '';
        this.symbol = '';
    }
};

//CALCULATOR FUNCTIONS
function display(displayContainer, output){
    displayContainer.textContent = output;
    //scroll display to right
    const RIGHT_OFFSET = displayContainer.scrollWidth - displayContainer.clientWidth;
    displayContainer.scrollLeft = RIGHT_OFFSET;
}

function roundToMax(){
    const fractionalPart = operation.result.toString().split(DECIMAL_SYMBOL)[1];
    if(fractionalPart.length > MAX_DEC_POINTS) operation.result = parseFloat(operation.result.toFixed(MAX_DEC_POINTS));
}

function negateOperand(operandKey){
    if(operation[operandKey][0] === NEGATIVE_SYMBOL){
        operation[operandKey] = operation[operandKey].slice(1);
    }
    else if(operation[operandKey].length > 0){
        operation[operandKey] = NEGATIVE_SYMBOL + operation[operandKey];
    }
}

function checkIsDecimal(operandKey){
    return operation[operandKey].includes(DECIMAL_SYMBOL);
}

function checkIsValidNum(operandKey){
    return (operation[operandKey].length > 0) && (isFinite(operation[operandKey]));
}

function setOperands(digitString){
    if(operation.result !== '') clear(); //reset calculator after a completed operation
    let currentOperand = (operation.symbol === '') ? FIRST_OP_KEY : SECOND_OP_KEY;
    switch(digitString){
        case NEGATE_SYMBOL:
            negateOperand(currentOperand);
            break;
        case DECIMAL_SYMBOL:
            if(checkIsDecimal(currentOperand)) return;
        default:
            operation[currentOperand] += digitString;
    }
    let newOutput = (currentOperand === FIRST_OP_KEY) ? operation.firstOperand : `${operation.firstOperand} ${operation.symbol} ${operation.secondOperand}`;
    display(activeOutput, newOutput);
}

function setOperator(operatorString){
    operation.symbol = operatorString;
    display(activeOutput, `${operation.firstOperand} ${operation.symbol}`);
}

function evaluateOperation(operatorString){
    if(checkIsValidNum(SECOND_OP_KEY)){ //operate only when second operand is valid
        operation.operate();
        display(previousOperation, activeOutput.textContent);
        display(activeOutput, operation.firstOperand);
    }
    //set new operator only when not equals, and first operand is valid
    if((operatorString !== EQUALS_SYMBOL) && (checkIsValidNum(FIRST_OP_KEY))){
        operation.result = '';
        setOperator(operatorString);
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
    let currentKey = (operation.secondOperand.length > 0) ? SECOND_OP_KEY : (operation.symbol !== '') ? OP_SYMBOL_KEY : FIRST_OP_KEY; 
    operation[currentKey] = operation[currentKey].slice(0, -1);
    let newOutput = (currentKey === SECOND_OP_KEY) ? `${operation.firstOperand} ${operation.symbol} ${operation.secondOperand}` : operation.firstOperand;
    display(activeOutput, newOutput);
}

function edit(editId){
    if(activeOutput.textContent !== '') (editId === CLEAR_ID) ? clear() : backspace();
}

//EVENT LISTENERS
digitsContainer.addEventListener("click", (event) => {
    if(event.target instanceof HTMLButtonElement){
        event.target.blur();
        setOperands(event.target.textContent);
    }
});
operatorsContainer.addEventListener("click", (event) => {
    if(event.target instanceof HTMLButtonElement){
        event.target.blur();
        evaluateOperation(event.target.textContent);
    }
});
editContainer.addEventListener("click", (event) => {
    if(event.target instanceof HTMLButtonElement){
        event.target.blur();
        edit(event.target.id);
    }
});

document.addEventListener("keydown", (event) => {
    let key = event.key;
    if(DIGIT_KEYBOARD.includes(key)) setOperands(key);
    else if(key in OPERATOR_KEYBOARD) evaluateOperation(OPERATOR_KEYBOARD[key]);
    else if(key in EDIT_KEYBOARD) edit(EDIT_KEYBOARD[key]);
});

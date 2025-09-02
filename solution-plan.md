# Calculator Project Documentation
### PROBLEM
Create a calculator program that evaluates a single arithmetic operation at a time. The calculator provides buttons for the user to enter the first operand number, followed by an arithmetic operator, and finally the second operand number. The result is displayed after the user clicks the equal button.
* Arithmetic operations include add, subtract, multiply, and divide.
* A single operation involves two operands and an operator.
* The calculator provides digit, operator, and clear buttons, and a display.
* The calculator displays the numbers and operator as the user presses buttons.
* After the equals button is pressed, the result is displayed.
* Only a single arithmetic operation is evaluated at a time.
* If a second operator is pressed, the result of the first operation is used as the new operand for the second operator.
* Decimal results should be rounded to avoid long displays.
* No operation should take place if the equals button is pressed without two operands and an operator.
* If dividing by zero is attempted, a message is displayed to avoid the operation.
* If operators are pressed consecutively, only the most recent operator should be used for the operation.
* After a result is displayed, pressing any digit should clear the display and start a new operation.

### PLAN
**UI**  
<img src="./images/calculator-ui.svg" alt="Calculator UI design" height=400px>
- Display
- Digit buttons
- Operator buttons
- Clear button

**Input**
- First operand (number)
- Operator (symbol)
- Second operand (number)

**Output**
- Operation result (number)
- Error message (string)

**Process**
1. Get the first operand
2. Get the operator
3. Get the second operand
4. Display the input when buttons are pressed
5. Evaluate the operation when equals or second operator is pressed 
6. Display the result
7. After a result, clear the display when digits are pressed

### ALGORITHM
```
DECLARE global first operand variable
DECLARE global second operand variable
DECLARE global operator variable
SET global previous operation to DOM previous operation div
SET global output to DOM output div
SET global digits to DOM digits container
SET global operators to DOM operators container

FUNCTION add TAKES two addends
    RETURN the sum of both addends
ENDFUNCTION

FUNCTION subtract TAKES a minuend and a subtrahend
    RETURN the difference of minuend minus subtrahend
ENDFUNCTION

FUNCTION multiply TAKES a multiplicand and a multiplier
    RETURN the product of multiplying multiplicand by multiplier
ENDFUNCTION

FUNCTION divide TAKES a dividend and a divisor
    RETURN the quotient of dividing dividend by divisor
ENDFUNCTION

FUNCTION operate TAKES two operands, and an operator
    CASE operator OF
        ADDITION: call add function with operands, return result
        SUBTRACTION: call subtract function with operands, return result
        MULTIPLICATION: call multiply  with operands, return result
        DIVISION: call divide with operands, return result
    ENDCASE
ENDFUNCTION

FUNCTION display TAKES string output
    IF operator is empty THEN
        SET first operand to its current content plus string output
        SET output's text content to the first operand
    ENDIF
    ELSE
        SET second operand to its current content plus string output
        SET outputs text content to the first operand, operator, and second operand
    ENDELSE
ENDFUNCTION

LISTEN for digits container click event
    CALL display and PASS the target node's text content
ENDLISTEN

LISTEN for operators container click event
    IF event target id is equals THEN
        CONVERT first operand into a number
        CONVERT second operand into a number
        CALL operate and PASS two operands, and operator
    ENDIF
    ELSEIF second operand is empty THEN
        SET operator to target text symbol
    ENDELSEIF
ENDLISTEN
```
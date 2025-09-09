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
* The decimal button should not work after being used on a given operand
* The backspace button should remove one character at a time from the operation
* The user should be able to use their keyboard for inserting numbers, operators

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
- Previous operation (string)
- Divide by zero error message (string)

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
SET global operation object holding:
    first operand variable
    second operand variable
    operator symbol variable
    result variable
    operate function:
        CONVERT first operand into a number
        CONVERT second operand into a number
        CASE operator symbol OF
            ADDITION: call add function with operands, set to result
            SUBTRACTION: call subtract function with operands, set to result
            MULTIPLICATION: call multiply  with operands, set to result
            DIVISION: call divide with operands, set to result
        ENDCASE
        IF result IS NOT an integer and IS finite THEN
            CALL to round to max
        ENDIF
        SET first operand to result
        SET second operand to empty string
        SET symbol to empty string
SET global previous operation to DOM previous operation div
SET global output to DOM output div
SET global digits to DOM digits container
SET global operators to DOM operators container
SET global edit to DOM edit container
SET global decimal button node to DOM button

FUNCTION round to Max
    SET fractional part to operation result, to string, split by the decimal point
    IF the fractional portion of the result IS GREATER THAN the max limit THEN
        CALL to fixed on the result with max limit decimal points, and parse to float
    ENDIF
ENDFUNCTION

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

FUNCTION display TAKES display node and string output
    SET display node's text content to the string output
    SET right offset to display node's scroll width minus its visible width
    SET display node's scroll left position to the right offset
ENDFUNCTION

FUNCTION negate Operand TAKES operand name
    IF operand first character is negative sign THEN
        SET operand to a substring of itself except the negative sign
    ENDIF
    ELSEIF operand length IS GREATER THAN zero THEN
        SET operand to negative sign plus itself
    ENDELSE
ENDFUNCTION

FUNCTION set operands TAKES digit text
    DECLARE newOutput 
    IF result IS NOT empty THEN
        CALL clear function
    ENDIF
    IF operator symbol is empty THEN
        SET first operand to its current content plus text IF NOT +- OR call negate operand function
        SET newOutput to first operand
    ENDIF
    ELSE
        SET second operand to its current content plus text IF NOT +- OR call negate operand function
        SET newOutput to first operand, operator symbol, and second operand
    ENDELSE
    CALL display and PASS output container, and newOutput string
ENDFUNCTION

FUNCTION set operator TAKES text
    SET decimal button disabled to false
    SET operator symbol to text
    CALL display and PASS output container and first operand plus symbol
ENDFUNCTION

FUNCTION evaluate operation TAKES operator text
    IF second operand IS NOT empty THEN
        CALL operate on operation object
        SET decimal button disabled to false
        CALL display and PASS previous operation container and output text content
        CALL display and PASS output container and first operand
        
    ENDIF
    IF first operand IS finite AND operator text is IS NOT equals THEN
        SET result to empty string
        CALL set operator and PASS operator text
    ENDIF
ENDFUNCTION

FUNCTION clear
    FOR each key in operation
        IF current key is NOT operate function THEN
            SET current key value to empty string
        ENDIF
    ENDFOR
    SET decimal button disabled to false
    SET previous operation text content to an empty string
    SET output text content to an empty string
ENDFUNCTION

FUNCTION backspace
    DECLARE new output
    IF second operator length IS GREATER THAN zero THEN
        SET array to second operator split to array
        CALL pop on array, IF decimal THEN decimal button disabled to false
        SET second operator to array joined to string
        SET new output to first, symbol, and second operator string
    ELSEIF operator id IS NOT empty string
        SET operator id to empty string
        SET operator symbol to empty string
        IF first operand INCLUDES decimal THEN
            SET decimal disabled to false
        ENDIF
        SET new output to first operand
    ENDELSEIF
    ELSEIF first operand length IS  GREATER THAN zero THEN
        SET array to first operand split to array
        CALL pop on array IF decimal THEN decimal button disabled to false
        SET first operand to array joined to string
        SET new output to first operand
    ENDELSEIF
    CALL display with active output, and new output
ENDFUNCTION

FUNCTION edit TAKES edit container edit id
    IF active output IS an empty string THEN 
        RETURN out of function
    ENDIF
    IF id IS clear THEN
        CALL clear function
    ENDIF
    ELSEIF id IS backspace THEN
        CALL backspace function
    ENDELSEIF
ENDFUNCTION

LISTEN for digits container click event
    IF event target IS a button THEN
        IF the digit node IS decimal THEN
            SET decimal button disabled to true
        ENDIF
        CALL set operands and PASS click event text
    ENDIF
ENDLISTEN

LISTEN for operators container click event
    IF event target IS a button THEN 
        CALL evaluate operation and PASS click event text
    ENDIF
ENDLISTEN

LISTEN for edit container click event
    IF event target IS a button THEN
        CALL edit function and PASS click event id
    ENDIF
ENDLISTEN

LISTEN for document keydown event
    IF digits includes key THEN
        IF key is decimal THEN 
            SET decimal button disabled to true
        ENDIF
        CALL set operands function and PASS key
    ENDIF
    ELSEIF edit includes key THEN
        SET id to clear if key is delete OR escape, otherwise set to backspace
        CALL edit and PASS id
    ENDELSEIF
    ELSEIF operators includes key THEN
        CALL evaluate operation and PASS key
    ENDELSEIF
ENDLISTEN
```
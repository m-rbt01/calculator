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
```js
SET global operation object
    first operand variable
    second operand variable
    operator symbol variable
    result variable
    FUNCTION operate:
        CONVERT first operand into a number
        CONVERT second operand into a number
        CASE operator symbol OF
            ADDITION: add operands, set to result
            SUBTRACTION: subtract operands, set to result
            MULTIPLICATION: multiply operands, set to result
            DIVISION: divide operands, set to result
        ENDCASE
        IF result IS NOT an integer and IS finite THEN
            CALL to round to max
        ENDIF
        SET first operand to result
        SET second operand to empty string
        SET symbol to empty string
SET global previous operation to DOM previous operation div
SET global active output to DOM output div
SET global digits to DOM digits container
SET global operators to DOM operators container
SET global edit to DOM edit container
SET global decimal button node to DOM button

FUNCTION display TAKES display node and string output
    SET display node text content to the string output
    SET right offset to display node scroll-width minus its visible-width
    SET display node scroll left position to the right offset
ENDFUNCTION

FUNCTION round to Max
    SET fractional part to operation result, to string, split by the decimal point
    IF the fractional portion of the result IS GREATER THAN the max limit THEN
        CALL to fixed on the result with max limit decimal points, and parse to float
    ENDIF
ENDFUNCTION

FUNCTION negate Operand TAKES operand name
    IF operand first character is negative sign THEN
        SET operand to a substring of itself except the negative sign
    ENDIF
    ELSEIF operand length IS GREATER THAN zero THEN
        SET operand to negative sign plus itself
    ENDELSE
ENDFUNCTION

FUNCTION check is decimal TAKES operand name
    RETURN result of does given operand INCLUDE decimal?
ENDFUNCTION

FUNCTION check is valid number TAKES operand name
    RETURN result of is operand non-empty string AND finite number?
ENDFUNCTION

FUNCTION set operands TAKES digit text
    IF result IS NOT empty THEN
        CALL clear function
    ENDIF
    SET current operand name to first operand IF symbol is empty, OR second operand
    CASE digit text OF
        NEGATE: call NEGATE
        DECIMAL: IF call CHECK IS DECIMAL is true THEN return 
        OTHERS: current operand is set to itself plus digit text
    ENDCASE
    SET newOutput to first operand IF current operand is first, OR include operator symbol and second operand
    CALL display and PASS output container, and new output
ENDFUNCTION

FUNCTION set operator TAKES text
    SET operator symbol to text
    CALL display and PASS output container and first operand plus symbol
ENDFUNCTION

FUNCTION evaluate operation TAKES operator text
    IF check is valid number IS true for second operand THEN
        CALL operate on operation object
        CALL display and PASS previous operation container and output text content
        CALL display and PASS output container and first operand
        
    ENDIF
    IF operator text is IS NOT equals AND check is valid number IS true for first operand THEN
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
    SET previous operation text content to an empty string
    SET output text content to an empty string
ENDFUNCTION

FUNCTION backspace
    SET current key to IS second operator length IS GREATER THAN zero? THEN second operand key. OR IS symbol empty? THEN symbol key. OR first operand key
    SET current key to itself SLICED to the last character
    SET new output to IS current key second operand? THEN full operation. OR first operand
    CALL display with active output, and new output
ENDFUNCTION

FUNCTION edit TAKES edit container edit id
    IF active output IS NOT an empty string THEN 
        IF id IS clear THEN
            CALL clear function
        ENDIF
        ELSEIF id IS backspace THEN
            CALL backspace function
        ENDELSEIF
    ENDIF
ENDFUNCTION

LISTEN for digits container click event
    IF event target IS a button THEN
        REMOVE focus from target
        CALL set operands and PASS click event text
    ENDIF
ENDLISTEN

LISTEN for operators container click event
    IF event target IS a button THEN 
        REMOVE focus from target
        CALL evaluate operation and PASS click event text
    ENDIF
ENDLISTEN

LISTEN for edit container click event
    IF event target IS a button THEN
        REMOVE focus from target
        CALL edit function and PASS click event id
    ENDIF
ENDLISTEN

LISTEN for document keydown event
    IF digits includes key THEN
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
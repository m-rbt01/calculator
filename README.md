# Calculator Project
A calculator program that processes arithmetic operations and displays the result.

## About the Project
This project is intended to showcase input management, data processing, and DOM manipulation. The user provides input for a given operation (e.g. numbers, operators, edits) either through the provided UI or the user's keyboard. The calculator only processes one operation at a time, and is capable of chaining operations as the user selects multiple operators. Once an operation is complete, the result is displayed on the screen, along with it's associated operation.
* The active operation is managed with an object containing operands, operator symbol, the result, and a function to execute the operation.
* The program listens for digit, operator, or edit inputs (either through UI buttons or keyboard), and calls the appropriate functions to proceed with the operation.
* The program prevents users from providing invalid input such as multiple decimal points within a single operand, or operating without the required input.
* The program handles invalid operations (e.g. dividing by zero) appropriately and prevents them from crashing the program.

## Contact
Christian Donjuan - [LinkedIn](https://www.linkedin.com/in/christian-donjuan/) - chdonjuan.1@gmail.com  
Live Preview: 

## Acknowledgements
This project uses images from the following artists:
- **GitHub Logo** by [GitHub](https://github.com/logos).

This project was developed by applying key principles covered in the following resources:
- **Foundations Course** - _JavaScript Basics_, on [The Odin Project](https://www.theodinproject.com/paths/foundations/courses/foundations).
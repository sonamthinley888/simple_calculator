# React Calculator

A simple calculator built using React and the `useReducer` hook for state management.

## Features

✅ Perform basic arithmetic operations: Addition, Subtraction, Multiplication, and Division.  
✅ Clear screen (AC) and delete individual digits (DEL).  
✅ Prevents multiple decimal points in a number.  
✅ Prevents leading zeros (e.g., prevents `0005` input).  
✅ Well-formatted number display with `Intl.NumberFormat`.

## Technologies Used

- **React** (Functional Components, Hooks)
- **CSS** (Styling)
- **JavaScript (ES6+)**

## Project Structure

```
react-calculator/
│── src/
│   │── components/
│   │   ├── DigitButton.js
│   │   ├── OperationButton.js
│   │── App.js
│   │── Styles.css
│   │── index.js
│── public/
│── package.json
│── README.md
```

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/react-calculator.git
   cd react-calculator
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Click number buttons to enter a value.
- Click operation buttons (`+`, `-`, `*`, `÷`) to perform calculations.
- Press `=` to evaluate the expression.
- Use `AC` to reset the calculator and `DEL` to delete the last entered digit.

## Improvements & Future Enhancements

- Add keyboard support for user input.
- Implement advanced operations (square root, percentage, etc.).
- Improve UI/UX with animations and better styling.

## License

This project is open-source and available under the MIT License.

---

### Author

Developed by **Your Name**

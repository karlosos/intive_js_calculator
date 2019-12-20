const numberButtons = document.querySelectorAll('[action-number]');
const operationButtons = document.querySelectorAll('[action-operation]');
const calculateButton = document.querySelector('[action-calculate]');
const clearAllButton = document.querySelector('[action-c]');
const clearEntryButton = document.querySelector('[action-ce]');
const currentValueOutput = document.querySelector('[data-current-value]');

const calculator = new Calculator(currentValueOutput);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.addDigit(button.innerText);
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.setOperation(button.innerText);
  });
});

calculateButton.addEventListener('click', button => {
  calculator.calculate();
});

clearEntryButton.addEventListener('click', button => {
  calculator.clearEntry();
});

clearAllButton.addEventListener('click', button => {
  calculator.clearAll();
});

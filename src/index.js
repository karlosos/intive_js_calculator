const currentValueOutput = document.querySelector('[data-current-value]');
const expressionOutput = document.querySelector('[data-expression]');

const exchanger = new Exchanger();
const calculator = new Calculator(currentValueOutput, expressionOutput, exchanger);

const buttons = document.getElementById('inputs');

buttons.addEventListener('click', event => {
  if (event.target.hasAttribute('action-number')) {
    calculator.addDigit(event.target.innerText);
  } 
  else if (event.target.hasAttribute('action-operation')) {
    calculator.setOperation(event.target.innerText);
  } 
  else if (event.target.hasAttribute('action-calculate')) {
    calculator.calculate();
  } 
  else if (event.target.hasAttribute('action-ce')) {
    calculator.clearEntry();
  } 
  else if (event.target.hasAttribute('action-c')) {
    calculator.clearAll();
  }
  else if (event.target.hasAttribute('action-currency')) {
    calculator.setCurrency(event.target.innerText);
  }  
});
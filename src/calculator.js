class Calculator {
    constructor(currentValueOutput, expressionOutput, exchanger) {
      this.currentValue = "";
      this.lastValue = "";
      this.operation = "";
      this.currentCurrency = "";

      this.savedOperand = "";
      this.lastAnswer = "";

      this.currentValueOutput = currentValueOutput;
      this.expressionOutput = expressionOutput;
      this.expression = ""; // for calculating purposes e.g. 27^(1/3)+3.893
      this.expressionReadable = "" // for displaying purposes e.g. 27√3+USD1

      this.canSetOperation = false;

      this.exchanger = exchanger;
    }
  
    addDigit(digit) {
      if (digit === ",") {
        if (this.currentValue.indexOf(".") === -1) {
          this.currentValue += ".";
        }
      } else {
        this.currentValue += digit;
      }
      this.drawCurrentValue(this.currentValue);
      this.canSetOperation = true;
    }

    changeCurrency() {
      if (this.currentCurrency !== "") {
        let valueInPLN = exchanger.getValueInPLN(this.currentValue, this.currentCurrency);
        if (valueInPLN) {
          this.currentValue = valueInPLN;
          this.currentCurrency = "";
          return true;
        } else {
          return false;
        }
      }
      return true;
    }
  
    setOperation(operation) {
      // prevent adding multiple operations
      if (!this.canSetOperation) {
        return
      }
      this.canSetOperation = false;

      this.expressionReadable += this.currentValue + this.currentCurrency;
      if (!this.changeCurrency()) {
        return;
      }
      this.expression += this.currentValue;

      // if previous operation was √ then close parenthesis
      if (this.operation === '√') {
        this.expression += ')';
      }

      this.operation = operation;
      this.addOperationToExpression(operation);

      if (this.currentValue !== "") {
        this.lastValue = this.currentValue;
      }
      this.currentValue = "";
      this.currentCurrency = "";
      this.drawExpression();
      this.drawCurrentValue("");
      this.clearMemory();
    }

    setCurrency(currency) {
      this.currentCurrency = currency;
      this.exchanger.getCurrencyRate(currency);
    }

    addOperationToExpression(operation) {
      if (operation === '√') {
        this.expression += '^(1/'
      } else {
        this.expression += operation;
      }
      this.expressionReadable += operation;
    }
  
    clearEntry() {
      this.currentValue = "";
      this.drawCurrentValue("0");
    }
  
    clearAll() {
      this.clearMemory();
      this.expression = "";
      this.expressionReadable = "";
      this.currentValue = "";
      this.lastValue = "";
      this.operation = "";
      this.canSetOperation = false;
      this.drawCurrentValue("0");
      this.drawExpression();
      this.currentCurrency = "";
    }

    clearMemory() {
      this.savedOperand = "";
      this.lastAnswer = "";
    }

    calculate() {
      this.retryLastOperation()

      this.expressionReadable += this.currentValue + this.currentCurrency;
      if (!this.changeCurrency()) {
        return;
      }
      this.expression += this.currentValue;

      // when only one operand was given
      if (this.lastValue === "") {
        console.log(this.currentValue);
        this.drawCurrentValue(this.currentValue.toString());
        this.drawExpression();
        this.expression = "";
        this.expressionReadable = "";
        return;
      }

      // close parenthesis because with x√y we have x^(1/y) expression
      if (this.operation === '√') {
        this.expression += ')';
      }
    
      let result = math.evaluate(this.expression);
      this.drawExpression();
      this.drawCurrentValue(result.toString());

      this.lastAnswer = result;
      this.savedOperand = this.currentValue;
      this.expression = "";
      this.expressionReadable = "";
      this.currentValue = result;
    }

    retryLastOperation() {
      if (this.hasMemory()) {
        this.lastValue = this.lastAnswer;
        this.currentValue = this.savedOperand;
        this.expression = this.lastValue;
        this.expressionReadable = this.lastValue;
        this.addOperationToExpression(this.operation);
      }
    }

    hasMemory() {
      if (this.lastAnswer !== "" && this.savedOperand !== "") {
        return true;
      } else {
        return false;
      }
    }
  
    drawCurrentValue(val) {
      this.currentValueOutput.innerText = this.formatOutput(val);
    }

    drawExpression() {
      this.expressionOutput.innerText = this.formatOutput(this.expressionReadable);
    }
  
    formatOutput(str) {
      return str.replace(".", ",");
    }
  }

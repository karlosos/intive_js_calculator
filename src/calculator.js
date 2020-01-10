class Calculator {
    constructor(currentValueOutput, expressionOutput) {
      this.currentValue = "";
      this.lastValue = "";
      this.operation = "";

      this.savedOperand = "";
      this.lastAnswer = "";

      this.currentValueOutput = currentValueOutput;
      this.expressionOutput = expressionOutput;
      this.expression = "";

      this.canSetOperation = false;
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
  
    setOperation(operation) {
      // prevent adding multiple operations
      if (!this.canSetOperation) {
        return
      }
      this.canSetOperation = false;

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
      this.drawExpression();
      this.drawCurrentValue("");
      this.clearMemory();
    }

    addOperationToExpression(operation) {
      if (operation === '√') {
        this.expression += '^(1/'
      } else {
        this.expression += operation;
      }
    }
  
    clearEntry() {
      this.currentValue = "";
      this.drawCurrentValue("0");
    }
  
    clearAll() {
      this.clearMemory();
      this.expression = "";
      this.currentValue = "";
      this.lastValue = "";
      this.operation = "";
      this.canSetOperation = false;
      this.drawCurrentValue("0");
      this.drawExpression();
    }

    clearMemory() {
      this.savedOperand = "";
      this.lastAnswer = "";
    }

    calculate() {
      this.retryLastOperation()

      // when only one operand was given
      if (this.lastValue === "") {
        return;
      }

      this.expression += this.currentValue;

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
      this.currentValue = result;
    }

    retryLastOperation() {
      if (this.hasMemory()) {
        this.lastValue = this.lastAnswer;
        this.currentValue = this.savedOperand;
        this.expression = this.lastValue;
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
      this.expressionOutput.innerText = this.formatOutput(this.expression);
    }
  
    formatOutput(str) {
      return str.replace(".", ",");
    }
  }

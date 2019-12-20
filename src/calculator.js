class Calculator {
    constructor(currentValueOutput) {
      this.currentValue = "";
      this.lastValue = "";
      this.operation = "";
      this.savedOperand = "";
      this.currentValueOutput = currentValueOutput;
    }
  
    addDigit(digit) {
      if (digit == ",") {
        if (this.currentValue.indexOf(".") == -1) {
          this.currentValue += ".";
        }
      } else {
        this.currentValue += digit;
      }
  
      this.draw(this.currentValue);
    }
  
    setOperation(operation) {
      if (this.lastValue != "" && this.currentValue != "")
        this.calculate();
      this.operation = operation;
      if (this.currentValue != "") {
        this.lastValue = this.currentValue;
      }
      this.currentValue = "";
    }
  
    clearEntry() {
      this.currentValue = "";
      this.draw("0");
    }
  
    clearAll() {
      this.currentValue = "";
      this.lastValue = "";
      this.operation = "";
      this.draw("0");
    }
  
    calculate() {
      if (this.lastValue === "") {
        return;
      }
  
      if (this.currentValue === "" && this.savedOperand != "") {
        this.currentValue = this.savedOperand;
      }
  
      let result = this.currentValue;
      if (this.operation == "+") {
        result = parseFloat(this.lastValue) + parseFloat(this.currentValue);
      }
      else if (this.operation == "-") {
        result = parseFloat(this.lastValue) - parseFloat(this.currentValue);
      }
      else if (this.operation == "*") {
        result = parseFloat(this.lastValue) * parseFloat(this.currentValue);
      }
      else if (this.operation == "/") {
        result = parseFloat(this.lastValue) / parseFloat(this.currentValue);
      }
  
      this.savedOperand = this.currentValue;
      this.lastValue = result.toString();
      this.draw(this.lastValue);
      this.currentValue = "";
    }
  
    draw(value) {
      this.currentValueOutput.innerText = this.formatOutput(value);
    }
  
    formatOutput(str) {
      return str.replace(".", ",");
    }
  }

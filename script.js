//? Creating Calculator class

class Calculator {
  constructor(previousText, currentText) {
    this.previousText = previousText;
    this.currentText = currentText;
    this.clear();
  }
  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) {
      return;
    }
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOpertion(operation) {
    if (this.currentOperand == "") {
      return;
    }
    if (this.previousOperand != "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(curr)) {
      return;
    }

    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "*":
        computation = prev * curr;
        break;
      case "/":
        computation = prev / curr;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  updateDisplay() {
    this.currentText.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousText.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousText.innerText = "";
    }
  }
}

//? accessing all the elements in the html element

const previousText = document.querySelector("[data-previous]");
const currentText = document.querySelector("[data-current]");
const numbers = document.querySelectorAll("[data-numbers]");
const operators = document.querySelectorAll("[data-operators]");
const equals = document.querySelector("[data-equals]");
const del = document.querySelector("[data-delete]");
const clear = document.querySelector("[data-clear]");

//? creating new calculator object

const calculator = new Calculator(previousText, currentText);

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOpertion(button.innerText);
    calculator.updateDisplay();
  });
});

equals.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

del.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

clear.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

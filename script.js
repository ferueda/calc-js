class Calculator {
  constructor(prevOutputElement, curOutputElement) {
    this.prevOutputElement = prevOutputElement;
    this.curOutputElement = curOutputElement;
    this.clear();
  }

  clear() {
    this.current = "";
    this.previous = "";
    this.operation = undefined;
  }

  delete() {
    this.current = this.current.toString().slice(0, -1);
  }

  addOperation(operation) {
    if (this.current === "") return;
    if (this.operation !== "") {
      this.evaluate();
    }
    this.operation = operation;
    this.previous = this.current;
    this.current = "";
  }

  addNumber(number) {
    if (number === "." && this.current.includes(".")) return;
    this.current = this.current.toString() + number.toString();
  }

  evaluate() {
    let result;
    const prev = parseFloat(this.previous);
    const curr = parseFloat(this.current);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "÷":
        result = prev / curr;
        break;
      case "x":
        result = prev * curr;
        break;
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev + curr;
        break;
      default:
        return;
    }
    this.current = result;
    this.previous = "";
    this.operation = undefined;
  }

  numDisplay(number) {
    const stringNum = number.toString();
    const intDigits = parseFloat(stringNum.split(".")[0]);
    const decDigits = stringNum.split(".")[1];
    let intDisplay;
    if (isNaN(intDigits)) intDisplay = "";
    else intDisplay = intDigits.toLocaleString("en", { maximumFractionDigits: 0 });
    if (decDigits != null) return `${intDisplay}.${decDigits}`;
    else return intDisplay;
  }

  updateDisplay() {
    this.curOutputElement.innerText = this.numDisplay(this.current);
    if (this.operation) {
      this.prevOutputElement.innerText = `${this.numDisplay(this.previous)} ${this.operation}`;
    } else this.prevOutputElement.innerText = this.numDisplay(this.previous);
  }
}

const numbersBtns = [...document.querySelectorAll("[data-number]")];
const operationsBtns = [...document.querySelectorAll("[data-op]")];
const previousElement = document.querySelector("[data-previous]");
const currentElement = document.querySelector("[data-current]");
const clearBtn = document.querySelector("[data-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const equalBtn = document.querySelector("[data-equal]");

const calculator = new Calculator(previousElement, currentElement);

function printNum() {
  calculator.addNumber(this.innerText);
  calculator.updateDisplay();
}

function printOp() {
  calculator.addOperation(this.innerText);
  calculator.updateDisplay();
}

function clearOutput() {
  calculator.clear();
  calculator.updateDisplay();
}

function deleteNum() {
  calculator.delete();
  calculator.updateDisplay();
}

function printResult() {
  calculator.evaluate();
  calculator.updateDisplay();
}

numbersBtns.forEach(button => button.addEventListener("click", printNum));
operationsBtns.forEach(button => button.addEventListener("click", printOp));
clearBtn.addEventListener("click", clearOutput);
deleteBtn.addEventListener("click", deleteNum);
equalBtn.addEventListener("click", printResult);

window.addEventListener("keydown", function(e) {
  if (!isNaN(e.key)) {
    calculator.addNumber(e.key);
    calculator.updateDisplay();
  } else if (e.key === "/") {
    calculator.addOperation("÷");
    calculator.updateDisplay();
  } else if (e.key === "*") {
    calculator.addOperation("x");
    calculator.updateDisplay();
  } else if (e.key === "+" || e.key === "-") {
    calculator.addOperation(e.key);
    calculator.updateDisplay();
  } else if (e.key === "Enter") {
    calculator.evaluate();
    calculator.updateDisplay();
  } else if (e.key === "Escape") {
    calculator.clear();
    calculator.updateDisplay();
  } else if (e.key === "Backspace") {
    calculator.delete();
    calculator.updateDisplay();
  }
});

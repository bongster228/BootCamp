// Add listeners to all the keys
const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");

// Display clicked numbers
const display = document.querySelector(".calculator__display");

// Calculates the result based on operator and values
const calculate = (val1, op, val2) => {
  let result;

  switch (op) {
    case "add":
      result = parseFloat(val1) + parseFloat(val2);
      break;
    case "subtract":
      result = parseFloat(val1) - parseFloat(val2);
      break;
    case "multiply":
      result = parseFloat(val1) * parseFloat(val2);
      break;
  }

  return result;
};

// Singnal which key was pressed
keys.addEventListener("click", e => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const previousKeyType = calculator.dataset.previousKeyType;

    const keyContent = key.textContent;
    const displayedNum = display.textContent;

    // Remove .is-depressed class from all the keys
    Array.from(key.parentNode.children).forEach(k =>
      k.classList.remove("is-depressed")
    );

    // Display pressed numbers
    if (!action) {
      // If previously pressed key was an operator, the currently
      // displayed number is cleared
      if (
        displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = keyContent;
        calculator.dataset.previousKeyType = "number";
      } else {
        display.textContent = displayedNum + keyContent;
      }
    }
    // Pressing the operator button records the first value
    // and the operator being pressed
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      // Calculate the value when operator key is pressed after
      // getting the frist value.
      // Prevent operator key from calculating when pressed consecutively
      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        // Update the firstValue for consecutive calculation
        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }

      key.classList.add("is-depressed");
      // Used to signal clear display for the second value
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.operator = action;
    }

    if (action === "decimal") {
      if (!display.textContent.includes(".")) {
        display.textContent = displayedNum + ".";
      }
      if (previousKeyType === "operator" || previousKeyType === "calculate") {
        display.textContent = "0.";
      }
      calculator.dataset.previousKeyType = "decimal";
    }

    if (action === "clear") {
      calculator.dataset.previousKeyType = "clear";
    }

    if (action === "calculate") {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      let secondValue = displayedNum;
      if (firstValue) {
        // If calculate button is pressed in a row, move the result
        // to firstValue and get the preserved secondValue from previous
        // calculation
        if (previousKeyType === "calculate") {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }
        display.textContent = calculate(firstValue, operator, secondValue);
      }
      calculator.dataset.previousKeyType = "calculate";
      // Preserve the second value
      calculator.dataset.modValue = secondValue;
    }
  }
});

import { useState } from "react";
import "./App.css";

function App() {
  const [firstNumber, setFirstNumber] = useState("0");
  const [secondNumber, setSecondNumber] = useState("0");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState(null);
  const [isSecondPanelActive, setIsSecondPanelActive] = useState(false);

  // numbers
  const handleNumberClick = (number, isSecondPanel = false) => {
    if (result !== null) {
      setResult(null);
      setFirstNumber(number);
      setIsSecondPanelActive(false);
      return;
    }
    if (isSecondPanel || isSecondPanelActive) {
      setIsSecondPanelActive(true);
      setSecondNumber((prev) => (prev === "0" ? number : prev + number));
    } else {
      setFirstNumber((prev) => (prev === "0" ? number : prev + number));
    }
  };

  // clear
  const handleClearClick = (isSecondPanel = false) => {
    if (isSecondPanel) {
      setSecondNumber("0");
    } else {
      setFirstNumber("0");
      setIsSecondPanelActive(false);
    }
  };

  // clicks
  const handleOperationClick = (op) => {
    setOperation(op);
    setIsSecondPanelActive(true);
  };

  // equals
  const handleEqualClick = () => {
    if (firstNumber === "" || secondNumber === "" || operation === "") return;
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    let res;
    switch (operation) {
      case "+":
        res = num1 + num2;
        break;
      case "-":
        res = num1 - num2;
        break;
      case "*":
        res = num1 * num2;
        break;
      case "÷":
        res = num1 / num2;
        break;
      default:
        return;
    }
    setResult(res);
  };

  return (
    <div className="calculator">
      <div className="panel">
        <p>{firstNumber}</p>
        <div className="numbers">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <button key={num} onClick={() => handleNumberClick(num.toString())}>
              {num}
            </button>
          ))}
          <button onClick={() => handleClearClick()}>Clear</button>
        </div>
      </div>

      <div className="panel">
        <p>{operation || "+"}</p>
        <div className="numbers">
          {["+", "-", "*", "÷"].map((op) => (
            <button key={op} onClick={() => handleOperationClick(op)}>
              {op}
            </button>
          ))}
        </div>
      </div>

      <div className="panel">
        <p>{secondNumber}</p>
        <div className="numbers">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString(), true)}
            >
              {num}
            </button>
          ))}
          <button onClick={() => handleClearClick(true)}>Clear</button>
        </div>
      </div>

      <div className="panel answer">
        <p>{result !== null ? result : "0"}</p>
        <div>
          <button onClick={handleEqualClick}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";

type Operation = {
  op: string;
  oldValue: number;
  newValue: number;
};

export default function App() {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [count, setCount] = useState(0);
  const [latestOperation, setLatestOperation] = useState<Operation | undefined>(
    undefined
  );

  const handleHeaderActions = (operation: string) => {
    switch (operation) {
      case "undo":
        setLatestOperation(operations.at(-1));
        setOperations((prev) => prev.slice(0, -1));
        break;

      case "redo":
        setOperations((prev) => [...prev, latestOperation as Operation]);
        setLatestOperation(undefined);
        break;

      case "reset":
        setOperations([]);
        setCount(0);
        setLatestOperation(undefined);
        break;
    }
  };

  const handleOperations = (count: number, operation: string) => {
    switch (operation) {
      case "division":
        return count / 2;

      case "subtraction":
        return count - 1;

      case "addition":
        return count + 1;

      case "multiplication":
        return count * 2;

      default:
        break;
    }
  };

  const applyOperation = (operation: string, uiValue: string) => {
    const result = handleOperations(count, operation);

    setOperations((prev) => [
      ...prev,
      {
        op: uiValue,
        oldValue: count,
        newValue: result as number,
      },
    ]);

    setCount(result as number);
  };

  return (
    <section>
      <div className="header-buttons-container">
        <button
          onClick={() => handleHeaderActions("undo")}
          disabled={operations?.length === 0}
        >
          undo
        </button>
        <button
          onClick={() => handleHeaderActions("redo")}
          disabled={!latestOperation}
        >
          redo
        </button>
        <button onClick={() => handleHeaderActions("reset")}>reset</button>
      </div>
      <div className="count-container">
        <div className="buttons-container">
          <button onClick={() => applyOperation("division", "/2")}>/2</button>
          <button onClick={() => applyOperation("subtraction", "-1")}>
            -1
          </button>
        </div>
        <span className="count">{count}</span>
        <div className="buttons-container">
          <button onClick={() => applyOperation("addition", "+1")}>+1</button>
          <button onClick={() => applyOperation("multiplication", "x2")}>
            x2
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr className="table-item">
            <th scope="col">op</th>
            <th scope="col">old</th>
            <th scope="col">new</th>
          </tr>
        </thead>
        <tbody className="table-body-container">
          {operations?.map(({ op, oldValue, newValue }) => (
            <tr className="table-item" key={op}>
              <td scope="row">{op}</td>
              <td scope="row">{oldValue}</td>
              <td scope="row">{newValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

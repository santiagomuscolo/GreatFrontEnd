import { useState } from "react";

export default function App() {
  const [list1, setList1] = useState([
    "HTML",
    "Javascript",
    "CSS",
    "Typescript",
  ]);
  const [list2, setList2] = useState(["React", "Angular", "Vue", "Svelte"]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const toggleSelected = (list: string, item: string) => {
    const key = `${list}-${item}`;
    setSelectedItems((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const handleTransfer = (actionType: string) => {
    switch (actionType) {
      case "all-right": {
        setList2((prev) => [...prev, ...list1]);
        setList1([]);
        setSelectedItems(new Set());
        break;
      }

      case "all-left": {
        setList1((prev) => [...prev, ...list2]);
        setList2([]);
        setSelectedItems(new Set());
        break;
      }

      case "selected-items-right": {
        const toMove = list1.filter((item) => selectedItems.has(`1-${item}`));
        if (toMove.length === 0) break;

        setList2((prev) => [...prev, ...toMove]);
        setList1((prev) => prev.filter((item) => !toMove.includes(item)));

        setSelectedItems((prev) => {
          const next = new Set(prev);
          toMove.forEach((item) => next.delete(`1-${item}`));
          return next;
        });
        break;
      }

      case "selected-items-left": {
        const toMove = list2.filter((item) => selectedItems.has(`2-${item}`));
        if (toMove.length === 0) break;

        setList1((prev) => [...prev, ...toMove]);
        setList2((prev) => prev.filter((item) => !toMove.includes(item)));

        setSelectedItems((prev) => {
          const next = new Set(prev);
          toMove.forEach((item) => next.delete(`2-${item}`));
          return next;
        });
        break;
      }

      default:
        break;
    }
  };

  return (
    <div>
      <div className="container">
        <div className="list-1-container">
          <ul className="list">
            {list1.map((item, index) => (
              <li key={index} className="list-item">
                <input
                  type="checkbox"
                  value={item}
                  checked={selectedItems.has(`1-${item}`)}
                  onChange={() => toggleSelected("1", item)}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="buttons-container">
          <button
            disabled={list2.length === 0}
            onClick={() => handleTransfer("all-left")}
          >
            &lt;&lt;
          </button>
          <button
            disabled={[...selectedItems].every((key) => !key.startsWith("2-"))}
            onClick={() => handleTransfer("selected-items-left")}
          >
            &lt;
          </button>
          <button
            disabled={[...selectedItems].every((key) => !key.startsWith("1-"))}
            onClick={() => handleTransfer("selected-items-right")}
          >
            &gt;
          </button>
          <button
            disabled={list1.length === 0}
            onClick={() => handleTransfer("all-right")}
          >
            &gt;&gt;
          </button>
        </div>
        <div>
          <ul className="list">
            {list2.map((item, index) => (
              <li key={index} className="list-item">
                <input
                  type="checkbox"
                  checked={selectedItems.has(`2-${item}`)}
                  value={item}
                  onChange={() => toggleSelected("2", item)}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

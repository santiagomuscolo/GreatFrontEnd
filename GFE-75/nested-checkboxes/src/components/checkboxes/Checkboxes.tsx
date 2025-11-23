import { useEffect, useRef, useState } from "react";

type CheckboxItem = {
  id: number;
  name: string;
  checked: boolean | "indeterminate";
  children?: CheckboxItem[];
};

export default function Checkboxes({
  defaultCheckboxData,
}: Readonly<{
  defaultCheckboxData: ReadonlyArray<CheckboxItem>;
}>) {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<Set<number>>(
    () => new Set()
  );

  const collectIds = (node: CheckboxItem, acc: number[] = []) => {
    acc.push(node.id);
    node.children?.forEach((child) => collectIds(child, acc));
    return acc;
  };

  const getNodeState = (
    node: CheckboxItem
  ): "checked" | "unchecked" | "indeterminate" => {
    const ids = collectIds(node);
    const checkedCount = ids.filter((id) => selectedCheckboxes.has(id)).length;

    if (checkedCount === ids.length) return "checked";
    if (checkedCount === 0) return "unchecked";
    return "indeterminate";
  };

  const handleCheck = (node: CheckboxItem) => {
    setSelectedCheckboxes((prev) => {
      const next = new Set(prev);
      const currentlyChecked = next.has(node.id);
      const idsToggle = collectIds(node);

      if (currentlyChecked) {
        idsToggle.forEach((node) => next.delete(node));
      } else {
        idsToggle.forEach((node) => next.add(node));
      }

      return next;
    });
  };

  const Node = ({ node }: { node: CheckboxItem; checkAll?: boolean }) => {
    const state = getNodeState(node);

    const checkboxRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = state === "indeterminate";
      }
    }, [state]);

    const isChecked = state === "checked";
    const hasChildren = !!node.children?.length;

    return (
      <div className="checkbox-container">
        <div className="checkbox-item">
          <input
            ref={checkboxRef}
            type="checkbox"
            checked={isChecked}
            onChange={() => handleCheck(node)}
          />
          <label>{node.name}</label>
        </div>
        <div className="children-container">
          {hasChildren &&
            node.children?.map((child) => <Node key={child.id} node={child} />)}
        </div>
      </div>
    );
  };

  return (
    <section>
      {defaultCheckboxData.map((item) => (
        <Node key={item.id} node={item} />
      ))}
    </section>
  );
}

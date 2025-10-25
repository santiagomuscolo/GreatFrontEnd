import { useState } from "react";
import { FILE_EXPLORER_DATA } from "./mock";
import type { TreeNode } from "./types";

function App() {
  const [expanded, setExpanded] = useState<Set<number>>(() => new Set());

  const isExpanded = (id: number) => expanded.has(id);

  const toggle = (id: number, hasChildren: boolean) => {
    if (!hasChildren) return;

    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const Node = ({ node }: { node: TreeNode }) => {
    const hasChildren = !!node.children?.length;
    const active = hasChildren && isExpanded(node.id);

    const caret = hasChildren ? (active ? "[-]" : "[+]") : "";
    const icon = hasChildren ? "📁" : "📄";

    return (
      <div>
        <button
          className={`button-item ${hasChildren ? "button-item--filled" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggle(node.id, hasChildren);
          }}
        >
          {icon} {node.name} {caret}
        </button>
        {active && (
          <div className="sub-container">
            {node.children!.map((child) => (
              <Node key={child.id} node={child} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section>
      <div className="container">
        {FILE_EXPLORER_DATA.map((root) => (
          <Node key={root.id} node={root} />
        ))}
      </div>
    </section>
  );
}

export default App;

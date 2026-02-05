interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export default function binaryTreeEqual(
  a: TreeNode | null,
  b: TreeNode | null,
): boolean {
  function deepCompare(
    nodeA: TreeNode | null,
    nodeB: TreeNode | null,
  ): boolean {
    if (!nodeA && !nodeB) return true;
    if (!nodeA || !nodeB) return false;
    if (nodeA.val !== nodeB.val) return false;

    return (
      deepCompare(nodeA.left, nodeB.left) &&
      deepCompare(nodeA.right, nodeB.right)
    );
  }

  return deepCompare(a, b);
}

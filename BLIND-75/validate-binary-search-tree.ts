interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export default function binarySearchTreeValidate(
  root: TreeNode | null,
): boolean {
  function validate(node: TreeNode | null, min: number, max: number): boolean {
    if (!node) return true;

    if (node.val <= min || node.val >= max) {
      return false;
    }

    const isLeftValid = validate(node.left, min, node.val);
    const isRightValid = validate(node.right, node.val, max);

    return isLeftValid && isRightValid;
  }

  return validate(root, -Infinity, Infinity);
}

type TreeNode = {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
  }
  
  export default function kthSmallestElementInABst(
    root: TreeNode | null,
    k: number,
  ): number {
    const values: number[] = [];
  
    const inorder = (node: TreeNode | null) => {
      if (!node) return;
  
      inorder(node.left);
      values.push(node.val);
      inorder(node.right);
    };
  
    inorder(root);
    return values[k - 1];
  }
  
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export default function BSTLowestCommonAncestor(
  root: TreeNode | null,
  a: TreeNode | null,
  b: TreeNode | null,
): TreeNode | null {
  if(!root){
    return null;
  };

  const val = root.val;
  const valA = a!.val;
  const valB = b!.val;

  if(valA > val && valB > val){
    return BSTLowestCommonAncestor(root.right, a, b);
  };

  if(valA < val && valB < val){
    return BSTLowestCommonAncestor(root.left, a, b);
  };

  return root;
}
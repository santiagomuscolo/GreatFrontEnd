export type TreeNode = {
    id: number;
    name: string;
    children?: TreeNode[];
  };
  
export type FileExplorerProps = {
    data: TreeNode[];
  };
  
export default function isBalancedBrackets(str: string): boolean {
    const stack = [];
    const pairs = {
      "}": "{",
      ")": "(",
      "]": "[",
    };
  
    for (const char of str) {
      if (["{", "(", "["].includes(char)) {
        stack.push(char);
      } else if (["}", ")", "]"].includes(char)) {
        if (stack.pop() !== pairs[char]) {
          return false;
        }
      }
    };
  
    return stack.length === 0;
  }
  
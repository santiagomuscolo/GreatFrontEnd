export default function maxProductSubArray(numbers: number[]): number {
    let max = numbers[0];
    let min = numbers[0];
    let result = numbers[0];
  
    for (let i = 1; i < numbers.length; i++) {
      const curr = numbers[i];
  
      if (curr < 0) {
        [max, min] = [min, max];
      }
  
      max = Math.max(curr, max * curr);
      min = Math.min(curr, min * curr);
  
      result = Math.max(result, max);
    }
  
    return result;
  }
  
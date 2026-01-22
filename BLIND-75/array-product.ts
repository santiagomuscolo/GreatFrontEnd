export default function arrayProductExcludingCurrent(
    numbers: number[],
  ): number[] {
    if(numbers.length === 0){
      return []
    }
  
    const n = numbers.length;
  
    const prefix = new Array(n).fill(1);
    const suffix = new Array(n).fill(1);
    const result = new Array(n).fill(1);
  
    prefix[0] = 1;
    for(let i = 1; i < n; i++){
      prefix[i] = prefix[i - 1] * numbers[i - 1]
    };
  
    suffix[n - 1] = 1;
    for(let i = n - 2; i >= 0; i--){
      suffix[i] = suffix[i + 1] * numbers[i + 1]
    };
  
    for(let i = 0; i < n; i++){
      result[i] = prefix[i] * suffix[i];
    }
  
    return result;
  }
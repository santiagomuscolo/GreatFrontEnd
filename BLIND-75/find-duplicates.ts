export default function findDuplicates(numbers: number[]): boolean {
    if(numbers.length <= 1) return false;
  
    const numbersMap = new Map<number, boolean>();
  
    for (let i = 0; i < numbers.length; i++) {
      if (numbersMap.has(numbers[i])) {
        return true;
      }
  
      numbersMap.set(numbers[i], true)
    };
  
    return false;
  }
  
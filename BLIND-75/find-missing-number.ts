export default function findMissingNumberInSequence(numbers: number[]): number {
    const orderedArray = [...numbers].sort((a, b) => a - b);
  
    if (orderedArray[0] !== 0) {
      return 0;
    }
  
    for (let i = 0; i < orderedArray.length - 1; i++) {
      if (orderedArray[i + 1] !== orderedArray[i] + 1) {
        return orderedArray[i] + 1;
      }
    }
  
    return orderedArray[orderedArray.length - 1] + 1;
  }
  
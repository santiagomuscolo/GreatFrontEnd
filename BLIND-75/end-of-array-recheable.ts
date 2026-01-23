enum Index {
    GOOD,
    BAD,
    UNKNOWN,
  }
  
  export default function arrayReachableEnd(numbers: number[]): boolean {
    let memo: Index[] = Array(numbers.length).fill(Index.UNKNOWN);
  
    memo[memo.length - 1] = Index.GOOD;
  
    for (let i = numbers.length - 2; i >= 0; i--) {
      let furthestPosition: number = Math.min(i + numbers[i], numbers.length - 1);
  
      for (let j = i + 1; j <= furthestPosition; j++) {
        if (memo[j] === Index.GOOD) {
          memo[i] = Index.GOOD;
          break;
        }
      }
    }
  
    return memo[0] === Index.GOOD;
  }
  
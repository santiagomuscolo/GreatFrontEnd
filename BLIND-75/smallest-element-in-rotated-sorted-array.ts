function smallestInRotatedArray(numbers: number[]): number {
    return Math.min(...numbers);
  }

//Solution with binary search
function smallestInRotatedArrayWithBinarySearch(numbers: number[]): number {
    let low = 0;
    let high = numbers.length - 1;
  
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
  
      if (numbers[mid] > numbers[high]) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
  
    return numbers[low];
  }
  
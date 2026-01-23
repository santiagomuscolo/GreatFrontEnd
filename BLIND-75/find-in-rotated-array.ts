//Solution with binary search
function findInRotatedArray(
    numbers: number[],
    target: number,
  ): number {
    let low = 0;
    let high = numbers.length - 1;
  
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
  
      if (numbers[mid] === target) {
        return mid;
      }
  
      if (numbers[low] <= numbers[mid]) {
        if (numbers[low] <= target && target < numbers[mid]) {
          high = mid - 1;
        } else {
          low = mid + 1;
        }
      } else {
        if (numbers[mid] < target && target <= numbers[high]) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
    }
  
    return -1;
  }
  

//Solution with indexOf
function findInRotatedArrayWithIndexOf(
    numbers: number[],
    target: number,
  ): number {
    const findIndexOfTarget = numbers.indexOf(target);
  
    if(findIndexOfTarget !== -1){
      return findIndexOfTarget;
    }
  
    return -1;
  }
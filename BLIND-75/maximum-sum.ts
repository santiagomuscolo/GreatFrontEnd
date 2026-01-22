export default function maxSumSubArray(numbers: number[]): number {
    let currentSum = numbers[0];
    let maxSum = numbers[0];
  
    for (let i = 1; i < numbers.length; i++){
      currentSum = Math.max(numbers[i], currentSum + numbers[i]);
      maxSum = Math.max(maxSum, currentSum);
    }
  
    return maxSum;
  }
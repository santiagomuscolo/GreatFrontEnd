export default function mostCommonElements(
    numbers: number[],
    k: number,
  ): number[] {
    const frequency = new Map<number, number>();
  
    for(const n of numbers){
      frequency.set(n, (frequency.get(n) ?? 0) + 1)
    };
  
    return [...frequency.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([num]) => num)
  }
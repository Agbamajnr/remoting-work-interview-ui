export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export function calculatePercentage(number: number, perc: number) {
  return (number / 100) * perc;
}

export function calculateNumberPercentage(n1: number, n2: number) {
  return (n1 / n2) * 100;
}
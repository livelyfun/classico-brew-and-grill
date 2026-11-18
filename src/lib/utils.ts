export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function formatPrice(amount: number): string {
  const formatted = Number.isInteger(amount)
    ? amount.toLocaleString('en-NP')
    : amount.toLocaleString('en-NP', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
  return `Rs. ${formatted}`;
}

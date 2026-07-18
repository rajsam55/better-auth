
export function formatCurrency(
  value: number | string,
  currency: string = 'USD'
): string {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(numericValue);
}



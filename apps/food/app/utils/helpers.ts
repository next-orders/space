export function getCurrencySign<CurrencyLiteral = string & object>(code?: CurrencyCode | CurrencyLiteral): string {
  switch (code as CurrencyCode) {
    case 'RUB':
      return '₽'
    case 'USD':
      return '$'
    case 'EUR':
      return '€'
    default:
      return ''
  }
}

export function getWeightLocalizedUnit<WeightUnitLiteral = string & object>(unit?: WeightUnit | WeightUnitLiteral): string {
  switch (unit as WeightUnit) {
    case 'G':
      return 'г'
    case 'KG':
      return 'кг'
    case 'ML':
      return 'мл'
    case 'L':
      return 'л'
    case 'LB':
      return 'фунт'
    case 'OZ':
      return 'унц'
    default:
      return ''
  }
}

export function getLocalizedPrice(value?: number): string {
  if (!value) {
    return ''
  }

  const remainder = value - Number.parseInt(value.toString())
  if (remainder > 0) {
    // Have some digits after dot: return as Decimal
    return value.toFixed(2)
  }

  // As it is: for RUB, currency with an integer
  return value.toString()
}

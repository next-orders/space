export function getWeightLocalizedUnit(unit: WeightUnit | undefined): string {
  switch (unit) {
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

export function getLocalizedPrice(value: number | null | undefined): string {
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

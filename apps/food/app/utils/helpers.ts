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
  const { t } = useI18n()

  switch (unit as WeightUnit) {
    case 'G':
      return t('common.abbreviation.g')
    case 'KG':
      return t('common.abbreviation.kg')
    case 'ML':
      return t('common.abbreviation.ml')
    case 'L':
      return t('common.abbreviation.l')
    case 'LB':
      return t('common.abbreviation.lb')
    case 'OZ':
      return t('common.abbreviation.oz')
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

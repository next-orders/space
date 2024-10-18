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

export function getWeightUnitValues(): { value: WeightUnit, label: string }[] {
  const { t } = useI18n()

  return [
    { value: 'KG', label: t('common.weight-unit.kg') },
    { value: 'G', label: t('common.weight-unit.g') },
    { value: 'L', label: t('common.weight-unit.l') },
    { value: 'ML', label: t('common.weight-unit.ml') },
    { value: 'OZ', label: t('common.weight-unit.oz') },
    { value: 'LB', label: t('common.weight-unit.lb') },
  ]
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

export function getLocalizedDayOfWeek(day: WorkingDay['day']): string {
  const { t } = useI18n()

  switch (day) {
    case 'SUNDAY':
      return t('common.day.sunday')
    case 'MONDAY':
      return t('common.day.monday')
    case 'TUESDAY':
      return t('common.day.tuesday')
    case 'WEDNESDAY':
      return t('common.day.wednesday')
    case 'THURSDAY':
      return t('common.day.thursday')
    case 'FRIDAY':
      return t('common.day.friday')
    case 'SATURDAY':
      return t('common.day.saturday')
    default:
      return ''
  }
}

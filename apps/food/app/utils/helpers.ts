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

export function getCurrencySign<CurrencyLiteral = string & object>(code?: CurrencyCode | CurrencyLiteral): string {
  switch (code as CurrencyCode) {
    case 'RUB':
      return '₽'
    case 'USD':
      return '$'
    case 'EUR':
      return '€'
    case 'GEL':
      return '₾'
    case 'BYN':
      return 'Br'
    case 'UAH':
      return '₴'
    case 'KZT':
      return '₸'
    case 'PLN':
      return 'zł'
    case 'TRY':
      return '₺'
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

export function getLocalizedDayOfWeek<DayLiteral = string & object>(day: WorkingDay['day'] | DayLiteral): string {
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

export function getLocalizedPaymentMethodTypesForSelect(): { value: PaymentMethodType, label: string }[] {
  const { t } = useI18n()

  return [
    { value: 'CASH', label: t('common.payment-type.cash') },
    { value: 'CARD', label: t('common.payment-type.card') },
    { value: 'CUSTOM', label: t('common.payment-type.custom') },
  ]
}

export function getLocalizedCountryCodesForSelect(): { value: CountryCode, label: string }[] {
  const { t } = useI18n()

  return [
    { value: 'BY', label: t('common.country.by') },
    { value: 'DE', label: t('common.country.de') },
    { value: 'ES', label: t('common.country.es') },
    { value: 'FR', label: t('common.country.fr') },
    { value: 'GB', label: t('common.country.gb') },
    { value: 'GE', label: t('common.country.ge') },
    { value: 'GR', label: t('common.country.gr') },
    { value: 'IT', label: t('common.country.it') },
    { value: 'KZ', label: t('common.country.kz') },
    { value: 'PL', label: t('common.country.pl') },
    { value: 'RU', label: t('common.country.ru') },
    { value: 'TR', label: t('common.country.tr') },
    { value: 'UA', label: t('common.country.ua') },
    { value: 'US', label: t('common.country.us') },
  ]
}

export function getLocalizedCurrencyCodesForSelect(): { value: CurrencyCode, label: string }[] {
  const { t } = useI18n()

  return [
    { value: 'EUR', label: `EUR - ${t('common.currency.eur')}` },
    { value: 'BYN', label: `BYN - ${t('common.currency.byn')}` },
    { value: 'GEL', label: `GEL - ${t('common.currency.gel')}` },
    { value: 'KZT', label: `KZT - ${t('common.currency.kzt')}` },
    { value: 'PLN', label: `PLN - ${t('common.currency.pln')}` },
    { value: 'RUB', label: `RUB - ${t('common.currency.rub')}` },
    { value: 'UAH', label: `UAH - ${t('common.currency.uah')}` },
    { value: 'USD', label: `USD - ${t('common.currency.usd')}` },
  ]
}

export function getLocalizedWeightUnitsForSelect(): { value: WeightUnit, label: string }[] {
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

export function getLocalizedTimezonesForSelect(): { value: TimeZone, label: string }[] {
  return [
    { value: '-12:00', label: '-12:00' },
    { value: '-11:00', label: '-11:00' },
    { value: '-10:00', label: '-10:00' },
    { value: '-09:00', label: '-09:00' },
    { value: '-08:00', label: '-08:00' },
    { value: '-07:00', label: '-07:00' },
    { value: '-06:00', label: '-06:00' },
    { value: '-05:00', label: '-05:00' },
    { value: '-04:00', label: '-04:00' },
    { value: '-03:00', label: '-03:00' },
    { value: '-02:00', label: '-02:00' },
    { value: '-01:00', label: '-01:00' },
    { value: '00:00', label: '00:00' },
    { value: '+01:00', label: '+01:00' },
    { value: '+02:00', label: '+02:00' },
    { value: '+03:00', label: '+03:00' },
    { value: '+04:00', label: '+04:00' },
    { value: '+05:00', label: '+05:00' },
    { value: '+06:00', label: '+06:00' },
    { value: '+07:00', label: '+07:00' },
    { value: '+08:00', label: '+08:00' },
    { value: '+09:00', label: '+09:00' },
    { value: '+10:00', label: '+10:00' },
    { value: '+11:00', label: '+11:00' },
    { value: '+12:00', label: '+12:00' },
  ]
}

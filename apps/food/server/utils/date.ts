export function getDayOfWeekByIndex(dayIndex: number): WorkingDay['day'] {
  switch (dayIndex) {
    case 0:
      return 'SUNDAY'
    case 1:
      return 'MONDAY'
    case 2:
      return 'TUESDAY'
    case 3:
      return 'WEDNESDAY'
    case 4:
      return 'THURSDAY'
    case 5:
      return 'FRIDAY'
    case 6:
      return 'SATURDAY'
    default:
      return 'SUNDAY'
  }
}

export function getDayIndexByDay(day: WorkingDay['day']): number {
  switch (day) {
    case 'SUNDAY':
      return 0
    case 'MONDAY':
      return 1
    case 'TUESDAY':
      return 2
    case 'WEDNESDAY':
      return 3
    case 'THURSDAY':
      return 4
    case 'FRIDAY':
      return 5
    case 'SATURDAY':
      return 6
    default:
      return 0
  }
}

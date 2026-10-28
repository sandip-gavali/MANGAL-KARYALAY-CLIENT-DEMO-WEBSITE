/**
 * Date utility functions strictly avoiding timezone off-by-one shifts.
 * Dates are handled as YYYY-MM-DD string tokens.
 */

export function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function parseYYYYMMDD(dateStr: string): { year: number; month: number; day: number } {
  const [yearStr, monthStr, dayStr] = dateStr.split('-')
  return {
    year: parseInt(yearStr, 10),
    month: parseInt(monthStr, 10) - 1, // 0-indexed for JS Date
    day: parseInt(dayStr, 10),
  }
}

export function getTodayDateString(): string {
  return formatDateToYYYYMMDD(new Date())
}

export function isPastDate(dateStr: string): boolean {
  const todayStr = getTodayDateString()
  return dateStr < todayStr
}

export function formatIndianDate(dateStr: string): string {
  if (!dateStr) return ''
  const { year, month, day } = parseYYYYMMDD(dateStr)
  const d = new Date(year, month, day)
  
  // Format as "15 Nov 2026"
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${day} ${months[month]} ${year}`
}

export function formatIndianDateTime(isoStr: string): string {
  if (!isoStr) return ''
  try {
    const d = new Date(isoStr)
    return d.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  } catch {
    return isoStr
  }
}

export function getDaysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate()
}

export function getFirstDayOfMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex, 1).getDay()
}

export function addDaysToDate(dateStr: string, days: number): string {
  const { year, month, day } = parseYYYYMMDD(dateStr)
  const d = new Date(year, month, day + days)
  return formatDateToYYYYMMDD(d)
}

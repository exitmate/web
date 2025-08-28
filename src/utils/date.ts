export function getDday(endDate: Date): string {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(endDate)
  target.setHours(0, 0, 0, 0)

  const diffDays = Math.floor(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  )

  if (diffDays === 0) return 'D-Day'
  if (diffDays > 0) return `D-${diffDays}`
  return `D+${Math.abs(diffDays)}`
}

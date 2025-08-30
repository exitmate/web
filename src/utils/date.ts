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

export const formatYMD = (v?: string | number | Date) => {
  if (!v) return ''
  const d = new Date(v)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

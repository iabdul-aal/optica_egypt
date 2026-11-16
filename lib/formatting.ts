export function formatDateISO(
  dateISO: string,
  options: Intl.DateTimeFormatOptions = {}
): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  }).format(new Date(`${dateISO}T12:00:00`))
}

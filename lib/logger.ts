import "server-only"

type LogLevel = "info" | "warn" | "error"

interface ServerLogPayload {
  event: string
  route: string
  code?: string
  status?: number
  detail?: string
}

function sanitizeDetail(err: unknown): { code?: string; detail?: string } {
  if (!err || typeof err !== "object") {
    return typeof err === "string" ? { detail: err.slice(0, 200) } : {}
  }
  const record = err as Record<string, unknown>
  const code = typeof record.code === "string" ? record.code.slice(0, 64) : undefined
  const message =
    typeof record.message === "string"
      ? record.message.slice(0, 200)
      : err instanceof Error
        ? err.message.slice(0, 200)
        : undefined
  return { code, detail: message }
}

export function logServerEvent(level: LogLevel, payload: ServerLogPayload) {
  const entry = {
    ts: new Date().toISOString(),
    level,
    ...payload,
  }
  const serialized = JSON.stringify(entry)
  if (level === "error") {
    console.error(serialized)
  } else if (level === "warn") {
    console.warn(serialized)
  } else {
    console.info(serialized)
  }
}

export function logServerError(route: string, event: string, err: unknown, status?: number) {
  const { code, detail } = sanitizeDetail(err)
  logServerEvent("error", { route, event, code, status, detail })
}

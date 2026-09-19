import { getRequestConfig } from "next-intl/server"

export default getRequestConfig(async () => {
  return {
    locale: "en",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: (await import("@/messages/en.json")).default as any,
  }
})
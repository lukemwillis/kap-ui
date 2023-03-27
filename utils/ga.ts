export function pageView() {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "", {
      page_path: window.location.pathname,
    });
  }
}

export function event(
  eventName: (string & {}) | Gtag.EventNames,
  eventParams:
    | Gtag.CustomParams
    | Gtag.ControlParams
    | Gtag.EventParams
    | undefined
) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, eventParams);
  }
}

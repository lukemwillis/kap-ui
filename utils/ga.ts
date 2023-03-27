export function pageView() {
  if (typeof window !== "undefined") {
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
  if (typeof window !== "undefined") {
    window.gtag("event", eventName, eventParams);
  }
}

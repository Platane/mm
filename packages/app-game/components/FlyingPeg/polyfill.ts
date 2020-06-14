let p: Promise<any>;

export const usePointerEventPolyfill = () => {
  if ("PointerEvent" in window) return null;

  if (!p) {
    // @ts-ignore
    p = import("@wessberg/pointer-events");
  }

  throw p;
};

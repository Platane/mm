import "@wessberg/pointer-events";

export const polyfill = async () => {
  return;

  if (!("PointerEvent" in window)) {
    await import("@wessberg/pointer-events");
  }
};

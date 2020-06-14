export const read = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "");
  } catch (err) {
    return null;
  }
};

export const write = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {}
};

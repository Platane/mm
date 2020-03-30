import { Line } from "./type";

export const getRandomLine = (p: number, n: number): Line =>
  Array.from({ length: n }, () => Math.floor(Math.random() * p));

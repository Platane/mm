import { getAllLines } from "../allLines";

it("should generate all the lines", () => {
  const lines = getAllLines(1, 3);

  expect(lines).toEqual([[0, 0, 0]]);
});

it("should generate all the lines", () => {
  const lines = getAllLines(2, 2);

  expect(lines.length).toBe(4);
  expect(lines).toContainEqual([0, 0]);
  expect(lines).toContainEqual([0, 1]);
  expect(lines).toContainEqual([1, 0]);
  expect(lines).toContainEqual([1, 1]);
});

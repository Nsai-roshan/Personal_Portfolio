import { moveItem } from "./experienceOrder";

describe("moveItem", () => {
  const experiences = [
    { id: "exp_1", job_title: "First" },
    { id: "exp_2", job_title: "Second" },
    { id: "exp_3", job_title: "Third" },
  ];

  test("moves an item up by one position", () => {
    const result = moveItem(experiences, 1, -1);
    expect(result.map((item) => item.id)).toEqual(["exp_2", "exp_1", "exp_3"]);
  });

  test("moves an item down by one position", () => {
    const result = moveItem(experiences, 1, 1);
    expect(result.map((item) => item.id)).toEqual(["exp_1", "exp_3", "exp_2"]);
  });

  test("returns original order when trying to move first item up", () => {
    const result = moveItem(experiences, 0, -1);
    expect(result.map((item) => item.id)).toEqual(["exp_1", "exp_2", "exp_3"]);
  });

  test("returns original order when trying to move last item down", () => {
    const result = moveItem(experiences, 2, 1);
    expect(result.map((item) => item.id)).toEqual(["exp_1", "exp_2", "exp_3"]);
  });
});

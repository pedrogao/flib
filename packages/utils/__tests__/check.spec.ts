import { describe, expect, test } from "@jest/globals";
import { isFalsey, camelize } from "../check";

describe("isFalsey", () => {
  test("null", () => {
    expect(isFalsey(null)).toBe(true);
  });
});

// describe("camelize", () => {
//   test("userName", () => {
//     expect(camelize("userName")).toBe("user_name");
//   });
// });

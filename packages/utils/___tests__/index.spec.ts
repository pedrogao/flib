import { describe, expect, test } from "@jest/globals";
import { isFalsey } from "../index";

describe("isFalsey", () => {
  test("null", () => {
    expect(isFalsey(null)).toBe(true);
  });
});

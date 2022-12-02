import { describe, expect, test } from "@jest/globals";
import { reactive } from "../reactive";

describe("reactive", () => {
  test("{ name: 'pedro' }", () => {
    const proxy = reactive({ name: "pedro" });
    proxy.name = "123";
    expect(proxy.name).toBe("123");
  });
});

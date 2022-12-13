import { watchEffect } from "../main";

describe("watchEffect", () => {
  test("{ name: 'pedro' }", () => {
    watchEffect(() => {
      console.log("jest");
    });
  });
});

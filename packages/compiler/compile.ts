import { parse } from "./parse";
import { generate } from "./codegen";

export function compile(template: string) {
  const ast = parse(template);
  return generate(ast);
}

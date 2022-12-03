export const NodeTypes = {
  ROOT: "ROOT",
  ELEMENT: "ELEMENT",
  TEXT: "TEXT",
  SIMPLE_EXPRESSION: "SIMPLE_EXPRESSION",
  INTERPOLATION: "INTERPOLATION",
  ATTRIBUTE: "ATTRIBUTE",
  DIRECTIVE: "DIRECTIVE",
};

export const ElementTypes = {
  ELEMENT: "ELEMENT",
  COMPONENT: "COMPONENT",
};

export function createRoot(children: any) {
  return {
    type: NodeTypes.ROOT,
    children,
  };
}

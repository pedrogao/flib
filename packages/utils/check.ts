/**
 * refer: https://juejin.cn/post/7169420903888584711
 */

/**
 * @param value any object or value
 * @returns false or not
 */
export const isFalsey = (value: any) => !value;

export const isObject = (value: any) => {
  return typeof value === "object" && value !== null;
};

export const isFunction = (value: any) => {
  return typeof value === "function";
};

export const isArray = (value: any) => {
  return Array.isArray(value);
};

export const isString = (value: any) => {
  return typeof value === "string";
};

export const isNumber = (value: any) => {
  return typeof value === "number";
};

export const hasChanged = (value: any, oldValue: any) => {
  return value !== oldValue && (value === value || oldValue === oldValue);
};

const camelizeRE = /-(\w)/g;
export const camelize = (str: string) => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
};

export const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};

export function toCamelCase(str: string) {
  return str.replace(/([-_][a-z])/g, (group) => {
    return group.toUpperCase().replace("-", "").replace("_", "");
  });
}

export function camelToSnakeCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}

export function toCamelCase(str: string) {
	return str.replace(/([-_][a-z])/g, (group) => {
		return group.toUpperCase().replace("-", "").replace("_", "");
	});
}

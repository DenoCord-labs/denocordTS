// deno-lint-ignore-file
export class Cache {
  cache = new Map<any, any>();
  constructor() {}

  get(key: string) {
    return this.cache.get(key);
  }
  has(key: string) {
    return this.cache.has(key);
  }
  set(key: string, value: any) {
    this.cache.set(key, value);
  }
}

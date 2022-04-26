// Transforms an object into the query params string of a url
export function parseQueryParams(params: Record<string, string | number | boolean | null | undefined> = {}): string {
  const query = Object.keys(params)
    .filter((k) => ![null, undefined, ""].includes(params[k] as string | null | undefined))
    .map((k) => `${k}=${params[k]}`)
    .join("&");

  return query ? `?${query}` : "";
}

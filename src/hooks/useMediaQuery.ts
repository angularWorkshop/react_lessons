export function useMediaQuery(query: string): boolean {
  return query.includes('dark');
}

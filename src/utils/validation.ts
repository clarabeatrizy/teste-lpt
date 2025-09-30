export function requireNonEmpty(value: string, fieldName: string) {
  if (!value || value.trim().length === 0) {
    throw new Error(`${fieldName} é obrigatório`);
  }
}

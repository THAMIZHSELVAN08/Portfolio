/** Join class names, dropping falsy values. */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * A field is "to be determined" when it is empty or still carries a
 * TODO_* placeholder. UI blocks check this and hide themselves, so
 * placeholders never render as visible text.
 */
export function isTbd(value: string | null | undefined): boolean {
  if (!value) return true;
  const trimmed = value.trim();
  return trimmed === "" || trimmed.startsWith("TODO");
}

/** True when there is at least one renderable entry. */
export function hasEntries(values: string[] | undefined | null): string[] {
  if (!values) return [];
  return values.filter((v) => !isTbd(v));
}

/** Zero-padded section/project index, e.g. 1 -> "01". */
export function padIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

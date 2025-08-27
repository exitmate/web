export type InputConstraints = {
  maxLength?: number;
  minLength?: number;
  numericOnly?: boolean;
  allowed?: RegExp;
  pattern?: RegExp;
  trim?: boolean;
  normalizeSpaces?: boolean;
  allowNewline?: boolean;
  formatter?: (v: string) => string;
};

export const yyyyMmDdFormatter = (v: string) => {
  return v.replace(/\D/g, "").slice(0, 8);
};

export const isDateField = (field?: string) => {
  if (!field) return false;
  if (/date/i.test(field)) return true;
  if (/(?:At|_at|-at)$/.test(field)) return true;
  return false;
};

export const constraintsForField = (field?: string): InputConstraints | undefined => {
  if (!isDateField(field)) return undefined;
  return {
    allowNewline: false,
    trim: true,
    minLength: 8,
    numericOnly: true,
    maxLength: 8,
    pattern: /^\d{8}$/,
    formatter: yyyyMmDdFormatter,
  };
};

export const applyConstraints = (raw: string, constraints?: InputConstraints) => {
  let v = raw;
  if (constraints?.allowNewline === false) v = v.replace(/\r?\n/g, "");
  if (constraints?.numericOnly) v = v.replace(/\D+/g, "");
  if (constraints?.allowed) v = Array.from(v).filter(ch => constraints.allowed!.test(ch)).join("");
  if (constraints?.normalizeSpaces) v = v.replace(/\s+/g, " ");
  if (constraints?.trim) v = v.trim();
  if (typeof constraints?.maxLength === "number") v = v.slice(0, constraints.maxLength);
  if (constraints?.formatter) v = constraints.formatter(v);
  return v;
};
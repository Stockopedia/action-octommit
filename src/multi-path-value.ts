import { MultiPathValue } from "./models";

export function parseMultiPathValue(
  input: string,
  coerce?: any,
): MultiPathValue {
  const pathValuesRaw = (input || "").split(/\s*;\s*/g);
  return pathValuesRaw
    .filter((v) => !!v.trim())
    .map((pathValueRaw) => {
      const equalsCount = pathValueRaw.match(/=/g)?.length ?? 0;
      if (equalsCount === 0) {
        throw new MultiPathValueError(
          `Could not parse value "${pathValueRaw}" - it should contain an = symbol`,
        );
      } else if (equalsCount > 1) {
        throw new MultiPathValueError(
          `Could not parse value "${pathValueRaw}" - it should contain exactly one = symbol (found ${equalsCount})`,
        );
      }
      const [path, value] = pathValueRaw.split(/\s*=\s*/g);
      return {
        path: path.trim(),
        value: coerce ? coerce(value.trim()) : value.trim(),
      };
    });
}

export class MultiPathValueError extends Error {}

import type { BaseSafe } from "@/types/errors";
import { ValidationError } from "yup";
import { errorHandler } from "./error-handler";

async function yupValidateHandler<T>(
  promise: Promise<T>
): Promise<BaseSafe<T>> {
  const result = await errorHandler<T, ValidationError>(promise, (err) => {
    const error = {} as Record<keyof T, string>;

    err.inner.forEach((_errInner) => {
      const path = _errInner.path as keyof T;
      error[path] = _errInner.errors[0];
    });

    return { success: false, error };
  });

  return result;
}

export { yupValidateHandler };

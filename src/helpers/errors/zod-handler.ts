import type { BaseSafe } from "@/types/errors";
import { errorHandler, type PromiseOrFunction } from "./error-handler";
import type { ZodError } from "zod";

async function zodValidateHandler<T>(
  promise: PromiseOrFunction<T>
): Promise<BaseSafe<T, ZodError>> {
  const result = await errorHandler<T, ZodError>(promise, (err) => {
    const error = {} as Record<keyof T, string>;

    err.errors.forEach((_errItem) => {
      const path = _errItem.path[0] as keyof T;
      error[path] = _errItem.message;
    });

    return { success: false, error };
  });

  return result;
}

export { zodValidateHandler };

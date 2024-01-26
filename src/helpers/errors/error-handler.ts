import type { BaseSafe } from "@/types/errors";

type PromiseOrFunction<T> = Promise<T> | (() => T);

function errorHandler<T, U extends Error>(
  promiseOrFunc: PromiseOrFunction<T>,
  err?: (_err: U) => BaseSafe<T, U>
): Promise<BaseSafe<T, U>> | BaseSafe<T, U> {
  if (promiseOrFunc instanceof Promise)
    return errorHandlerAsync(promiseOrFunc, err);
  return errorHandlerSync(promiseOrFunc, err);
}

async function errorHandlerAsync<T, U extends Error>(
  promise: Promise<T>,
  err?: (_err: U) => BaseSafe<T, U>
): Promise<BaseSafe<T, U>> {
  try {
    const data = await promise;
    return { success: true, data };
  } catch (error) {
    if (err) return err?.(error as U);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "Something wrong..." };
  }
}

function errorHandlerSync<T, U extends Error>(
  func: () => T,
  err?: (_err: U) => BaseSafe<T, U>
): BaseSafe<T, U> {
  try {
    const data = func();
    return { success: true, data };
  } catch (error) {
    if (err) return err?.(error as U);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "Something wrong..." };
  }
}

export type { PromiseOrFunction };

export { errorHandler, errorHandlerAsync, errorHandlerSync };

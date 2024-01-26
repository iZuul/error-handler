type BaseSafeSuccess<T> = {
  success: true;
  data: T;
};

type BaseSafeError<T> = {
  success: false;
  error: T | string;
};

type BaseSafeErrorRecord<T> = BaseSafeError<Record<keyof T, string>>;

type BaseSafe<T, U = unknown> =
  | BaseSafeSuccess<T>
  | BaseSafeError<U>
  | BaseSafeErrorRecord<T>;

export type { BaseSafe, BaseSafeError, BaseSafeSuccess, BaseSafeErrorRecord };

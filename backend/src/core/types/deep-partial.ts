export type DeepPartial<T> = T extends Date
  ? Date
  : T extends object
    ? { [P in keyof T]?: DeepPartial<T[P]> }
    : T;

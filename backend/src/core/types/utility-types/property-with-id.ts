export type TPropertyWithId<T> = T & {
  _id: string;
};

export type TPropertyWithExternalId<T, K extends string> = {
  _id: string;
} & Record<K, T>;

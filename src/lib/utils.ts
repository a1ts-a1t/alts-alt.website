const identity = <T>(input: T): T => input;

export const pipe = <T>(...args: ((input: T) => T)[]): ((input: T) => T) => {
  return args.reduce((acc, fn) => {
    return (input) => fn(acc(input));
  }, identity);
};

export const isNonNull = <T, NonNullableT extends NonNullable<T>>(
  arg: T,
): arg is NonNullableT => {
  return arg !== undefined && arg !== null;
};

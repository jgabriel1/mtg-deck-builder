type Callback = (...args: any[]) => any | Promise<any>;

type ReturnCallback<T extends Callback> = (
  ...args: Parameters<T>
) => ReturnType<T>;

export const withDebounce = <F extends Callback>(
  fn: F,
  timeout: number
): ReturnCallback<F> => {
  let timeoutObj: NodeJS.Timeout;

  return (async (...args) => {
    if (timeoutObj) clearTimeout(timeoutObj);

    return await new Promise(res => {
      timeoutObj = setTimeout(async () => {
        const returnValue = await fn(...args);

        res(returnValue);
      }, timeout);
    });
  }) as ReturnCallback<F>;
};

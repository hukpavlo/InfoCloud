export const logger = {
  info: (...args: any[]) => {
    console.log(...args);
  },
  error: (err: Error) => {
    console.error(err);
  },
};

export const timeout = (miliseconds: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, miliseconds);
  });

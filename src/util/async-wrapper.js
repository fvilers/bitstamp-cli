export const asyncWrapper =
  fn =>
    argv =>
      Promise.resolve(fn(argv))
        .catch(err => console.error(err.message || err));

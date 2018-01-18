import chalk from 'chalk';

export const asyncWrapper =
  fn =>
    argv =>
      Promise.resolve(fn(argv))
        .catch(err => console.error(chalk.bold.red(err.message || err)));

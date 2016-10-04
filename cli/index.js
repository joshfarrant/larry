import { copy, getDirs, exec } from './modules/io';
import config from '../larry.config';
import 'colors';
import console from 'better-console';

console.log('\nHello, Larry!\n'.rainbow);

const { copy: { src, dst }, cmds: { afterEach, before } } = config;

/**
 * The magic chain of promises that
 * gets shit done!
 */

const runBefore = () => {

  return new Promise((resolve) => {
    if (typeof before !== 'function') {
      resolve();
    } else {
      resolve(exec(before()));
    }

  });

};

runBefore().then(() => getDirs(src)).then(dirs => {

  /**
   * Builds an array of functions, each of which
   * returns a promise. The promise copies the
   * files to the destination, runs the afterEach
   * command, then moves on to the next function
   */
  const funcs = dirs.map(dir => {
    return () => copy(dir, dst)
                  .then(() => exec(afterEach(dir)))
                  .catch(err => console.log(err));
  });

  /**
   * A clever way to run the promise-returning
   * functions using array.reduce essentially
   * creating a chain of promises, eg:
   * p3.then(p2.then(p1.then(Promise.resolve())))
   */
  return funcs.reduce((p, fn) => p.then(fn), Promise.resolve());

}).then(() => {
  console.log('\nLarry\'s all done!!!'.bold.green);
}).catch(err => {
  console.log('err: ', err);
});

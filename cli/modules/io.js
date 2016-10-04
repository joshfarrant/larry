import fse from 'fs-extra';
import path from 'path';
import childProcess from 'child_process';
import 'colors';
import console from 'better-console';


export const copy = (src, dst) => {

  console.log(`Copying ${src} -> ${dst}`.grey);

  return new Promise((resolve, reject) => {

    fse.copy(src, dst, {
      clobber: true
    }, err => {

      if (err) {
        reject(err);
      } else {
        console.log(`Copied  ${src} -> ${dst}`.cyan);
        resolve();
      }

    });

  });

};


export const getDirs = (dirPath) => {

  return new Promise((resolve, reject) => {

    fse.readdir(dirPath, (err, files) => {

      if (err) {
        reject(err);
      } else {
        const dirs = files
          .map(
            f => path.join(dirPath, f)
          ).filter(
            f => fse.lstatSync(f).isDirectory()
          );
        resolve(dirs || []);
      }

    });

  });

};


export const exec = (cmd) => {

  console.log(`Started  ${cmd}`.grey);

  return new Promise((resolve, reject) => {

    childProcess.exec(cmd, (err, stdout) => {

      if (err) {
        reject(err);
      } else {
        console.log(`Finished ${cmd}`.cyan);
        resolve(stdout);
      }

    });

  });

};

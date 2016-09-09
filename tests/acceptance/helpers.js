import fs from 'fs-extra';

export function cleanUp(path) {
  return new Promise((resolve, reject) => {
    fs.remove(path, error => {
      if (error && error.code !== 'ENOENT') {
        return reject(error);
      }
      resolve();
    });
  });
}

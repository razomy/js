export function getAllCommitHashes(git) {
  return new Promise<{ hash: string, date: string, authorName: string }[]>((resolve, reject) => {
    git.log((err, log) => {
      if (err) {
        reject(err);
        return;
      }

      const commitHashes = log.all.reverse();
      resolve(commitHashes);
    });
  });
}
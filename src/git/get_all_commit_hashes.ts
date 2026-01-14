export default function get_all_commit_hashes(git) {
  return new Promise<{ hash: string, date: string, author_name: string }[]>((resolve, reject) => {
    git.log((err, log) => {
      if (err) {
        reject(err);
        return;
      }

      const commit_hashes = log.all.reverse();
      resolve(commit_hashes);
    });
  });
}
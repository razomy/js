import * as path from 'path';

export function staticHtml() {
  return (req, res) => {
    const dirname = path.resolve();
    res.sendFile(path.join(dirname, 'public', 'index.html'));
  }
}



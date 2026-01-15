import path from 'path';

export function static_html() {
  return (req, res) => {
    const dirname = path.resolve();
    res.sendFile(path.join(dirname, 'public', 'index.html'));
  }
}



import path from 'path';

export default function static_html() {
  return (req, res) => {
    const __dirname = path.resolve();
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
}



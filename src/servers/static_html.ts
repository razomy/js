import path from 'path';

export function static_html() {
  return (req, res) => {
    const __dirname = path.resolve();
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
}

export default static_html;

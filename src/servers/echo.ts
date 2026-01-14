export default function echo() {
  return function(req, res) {
    res.send('Hello World');
  };
}



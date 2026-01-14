export function echo() {
  return function(req, res) {
    res.send('Hello World');
  };
}

export default echo;

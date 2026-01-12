function api_key(key) {
  const valid_api_keys = new Set([
    key,
  ]);

  return function express_middleware(req, res, next) {
    const api_key = req.headers['x-api-key'];

    if (!api_key || !valid_api_keys.has(api_key)) {
      return res.status(401).json({error: 'Invalid API key.'});
    }

    next();
  }
}

export default api_key;

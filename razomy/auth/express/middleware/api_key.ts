export function apiKey(key) {
  const validApiKeys = new Set([
    key,
  ]);

  return function express_middleware(req, res, next) {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || !validApiKeys.has(apiKey)) {
      return res.status(401).json({error: 'Invalid API key.'});
    }

    next();
  }
}



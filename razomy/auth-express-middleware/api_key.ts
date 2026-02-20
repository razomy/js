export function apiKey(key: any) {
  const validApiKeys = new Set([
    key,
  ]);

  return function express_middleware(req: any, res: any, next: any) {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || !validApiKeys.has(apiKey)) {
      return res.status(401).json({error: 'Invalid API key.'});
    }

    next();
  }
}



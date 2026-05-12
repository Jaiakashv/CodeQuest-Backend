const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes by default

const cacheMiddleware = (duration) => (req, res, next) => {
  // Only cache GET requests
  if (req.method !== 'GET') {
    return next();
  }

  const key = req.originalUrl || req.url;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    console.log(`Cache hit for ${key}`);
    return res.json(cachedResponse);
  } else {
    console.log(`Cache miss for ${key}`);
    res.originalJson = res.json;
    res.json = (body) => {
      cache.set(key, body, duration);
      res.originalJson(body);
    };
    next();
  }
};

const clearCache = (keyPattern) => {
  if (!keyPattern) {
    cache.flushAll();
    console.log('All cache cleared');
    return;
  }
  
  const keys = cache.keys();
  const keysToDelete = keys.filter(key => key.includes(keyPattern));
  keysToDelete.forEach(key => cache.del(key));
  console.log(`Cleared cache for pattern: ${keyPattern}`);
};

module.exports = { cacheMiddleware, clearCache };

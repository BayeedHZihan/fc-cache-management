const Cache = require('../models/cache');

// move to env
const maxCache = 5; 
const ttl = 40;

// if the limit is exceeded then remove the entry with the TTL 
// which is about to finish or is already finished and the creation time is the oldest.
const handleCacheLimit = async (key, value) => {
  const count = await Cache.countDocuments();
  if (count < maxCache) return false;

  const entry = await Cache.find()
    .sort({
      ttl: 1,
      createdAt: 1  
    })
    .limit(1);
  if (!entry) return false;

  await Cache.updateOne({ key }, {
    key,
    value,
    ttl: generateTtl()
  });
  return true;
}

const generateTtl = () => {
  const newDate = new Date();
  newDate.setMinutes(newDate.getMinutes() + ttl);

  return newDate.getTime();
}

module.exports = {
  handleCacheLimit,
  generateTtl
}
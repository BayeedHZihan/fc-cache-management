const Cache = require('../models/cache');

// move to env
const maxCache = 5; 
const ttl = 5;

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
    .findOne();
  if (!entry) return false;

  await entry.updateOne({
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

const generateRandomString = () => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < 30; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

module.exports = {
  handleCacheLimit,
  generateTtl,
  generateRandomString
}
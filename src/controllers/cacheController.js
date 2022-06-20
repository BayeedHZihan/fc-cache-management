const Cache = require('../models/cache');
const { handleCacheLimit, generateTtl, generateRandomString } = require('../utils/functions');

const getOne = (req, res) => {

}

const getAll = async (req, res) => {
  const currentTime = new Date().getTime();
  const entries = await Cache.find({});
  const keys = await Promise.all(
    entries.map(async entry => {
      if (entry.ttl < currentTime) {
        const newValue = generateRandomString();
        await entry.updateOne({
          value: newValue,
          ttl: generateTtl()
        });
      }

      return entry.key;
    })
  );

  return res.json({
    data: keys,
    message: 'Cached keys retrieved successfully!'
  });
}

const createOrUpdate = async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;

  let cache = await Cache.findOne({ key });

  if (!cache) {
    const result = await handleCacheLimit(key, value);
    if (!result) {
      cache = new Cache({
        key,
        value,
        ttl: generateTtl()
      })
    }
    await cache.save();
    return res.status(201).json({
      message: 'Key is added successfully!'
    });
  }
  else {
    await cache.updateOne({ value });
    return res.status(200).json({
      message: 'Key is updated successfully!'
    });
  }
}

const removeOne = (req, res) => {

}

const removeAll = (req, res) => {

}


module.exports = {
  getOne,
  getAll,
  createOrUpdate,
  removeOne,
  removeAll
}
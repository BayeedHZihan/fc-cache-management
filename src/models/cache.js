const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cacheSchema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  value: {
    type: String,
    required: true
  },
  ttl: {
    type: Number
  }
}, { timestamps: true });

const Cache = mongoose.model('Cache', cacheSchema);
module.exports = Cache;
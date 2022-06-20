const express = require('express');
const cacheController = require('../controllers/cacheController');

const router = express.Router();

const { getOne, getAll, createOrUpdate, removeOne, removeAll } = cacheController;
const PATH = '/cacheEntries';

router.get(`${PATH}/:key`, getOne);
router.get(`${PATH}/`, getAll);
router.post(`${PATH}/:key`, createOrUpdate);
router.delete(`${PATH}/:key`, removeOne);
router.put(`${PATH}/`, removeAll);

module.exports = router;
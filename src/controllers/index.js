// src/controllers/index.js
const { Router } = require('express');
const shopController = require('./shop');

module.exports = async function initControllers() {
  const router = Router(); //創建Router物件
  router.use('/api/shop', await shopController()); //指定基層路徑
  return router;
};
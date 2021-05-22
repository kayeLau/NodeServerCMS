// src/controllers/shop.js
const { Router } = require('express');
const shopService = require('../server/shop');
const { createShopFormSchema } = require('../moulds/ShopForm');
const cors = require('cors');

class ShopController {
  shopService;

  async init() {
    this.shopService = await shopService();

    //路由配置
    const router = Router();
    router.get('/', cors(), this.getAll);
    router.get('/:shopId',cors(), this.getOne);
    router.put('/:shopId',cors(), this.put);
    router.delete('/:shopId',cors(), this.delete);
    return router;
  }

  getAll = async (req, res) => {
    const { pageIndex, pageSize } = req.query;
    const shopList = await this.shopService.find({ pageIndex, pageSize });
    res.json({ success: true, data: shopList });
  };

  getOne = async (req, res) => {
    const { shopId } = req.params;
    const shopList = await this.shopService.find({ id: shopId });

    if (shopList.length) {
      res.json({ success: true, data: shopList[0] });
    } else {
      res.status(404).send({ success: false, data: null });
    }
  };

  put = async (req, res) => {
    const { shopId } = req.params;
    const { name } = req.query;
    let data = name.split('|')
    try{
      data.map(async item =>{
        await createShopFormSchema().validate(item);
      })
    } catch(e){
      res.status(400).send({ success:false,message:e.message});
      return
    }
    const shopInfo = await this.shopService.modify({
      id: shopId,
      values:{
        first_name:data[0],
        family_name:data[1]
      }
    });

    if (shopInfo) {
      res.json({ success: true, data: shopInfo });
    } else {
      res.status(404).send({ success: false, data: null });
    }
  };

  delete = async (req, res) => {
    const { shopId } = req.params;
    const success = await this.shopService.remove({ id: shopId });

    if (!success) {
      res.status(404);
    }
    res.json({ success });
  };
}

module.exports = async () => {
  const c = new ShopController();
  return await c.init();
};
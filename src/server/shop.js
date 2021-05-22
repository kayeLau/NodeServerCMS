const SomeModel = require("../db/author.js");
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

let author = new SomeModel({
  first_name: "join",
  family_name: "Snow",
  date_of_birth: new Date("1976-05-18"),
  date_of_death: new Date("2016-05-18"),
});

author.save(function (err, res) {
  if (err) return console.log(err);
  console.log(res.name + "save to collecton.");
});


class ShopService {
  constructor(){
    this.res
  }
  async init() {
  }

  async find({ id, pageIndex = 0, pageSize = 10 }) {

    if(id){
      let _id = mongoose.Types.ObjectId(id);
      let query = SomeModel.find({'_id':_id});
      query.select("first_name family_name");
      query.exec(function(err,res){
        return res
      });
      return await query
    }

    let query = SomeModel.find();
    query.select("first_name family_name");
    query.limit(pageSize);
    query.skip(pageSize * pageIndex);
    query.exec(function(err,res){
      return res
    });
    //使用 async / await 获取查询结果。
    this.res = await query
    return this.res
  }

  async modify({ id, values }) {
    let _id = mongoose.Types.ObjectId(id);
    const target = await SomeModel.findByIdAndUpdate(
    _id,
    { $set: { first_name: values.first_name ,
              family_name: values.family_name}},
    {new: true}, 
    function(error){
      if(error){
        console.log(error)
      }
    });
    
    if (!target) {
      return null;
    }

    return await target.save();
  }

  async remove({ id }) {
    let _id = mongoose.Types.ObjectId(id);
    const target = await SomeModel.deleteOne({'_id':_id}, function(error){
      if(error){
        console.log(error)
      }
    });

    if (!target) {
      return false;
    }
    console.log(target)
    return target;
  }
}

// 单例模式
let service;
module.exports = async function () {
  if (!service) {
    service = new ShopService();
    await service.init();
  }
  return service;
};

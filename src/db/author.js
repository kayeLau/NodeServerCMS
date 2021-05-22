const mongoose = require("mongoose");

const Schema = mongoose.Schema; //定義綱要

const AuthorSchema = new Schema({
  //required是否必須, max min驗證器, default默認值
  first_name: { type: String, required: true, max: 100 },
  family_name: { type: String, required: true, max: 100 },
  date_of_birth:{ type:Date},
  date_of_death:{ type:Date}
});

AuthorSchema
.virtual('name')
.get(function (){
    return this.family_name + ',' + this.first_name;
})

AuthorSchema
.virtual('url')
.get(function () {
    console.log(this._id)
  return '/catalog/author/' + this._id;
});

//創建模型
module.exports = mongoose.model('Author',AuthorSchema); 
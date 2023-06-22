//  var express = require('express');
//  var router = express.Router();

// /* GET users listing. */
//  router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

// var mongoose = require("mongoose");
// var plm = require("passport-local-mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/mamazon");

// var userSchema = mongoose.Schema({
//   username:String,
//   name:String,
//   gstin: Number,
//   seller:Boolean,
//   pic:String,
//   password:String,
//   products:{
//     type:Array,
//     ref:"product"
//   },
//   wishlist:[{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "product"
//   }],
//   address:String,
//   contactnumber:String,
//   email:String
// });

// userSchema.plugin(plm);

// module.exports = mongoose.model("user", userSchema);


// ============ Shaksham =============

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mamazon").then(function () {
  console.log("connect");
});

const passportlm = require("passport-local-mongoose");

var userSchema = mongoose.Schema({
  name: String,
  username: String,
  passport: String,
  email: String,
  productid: [{

    type: mongoose.Schema.Types.ObjectId,
    ref:"products"
    
  }],
  address: String,
  seller: Boolean,
  contactnumber:String,
  pic:String,
  gstin:{
    type:Number,
    default:0
  }
});

userSchema.plugin(passportlm);
module.exports = mongoose.model("user", userSchema);




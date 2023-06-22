// const express = require('express');
// const passport = require('passport');
// const  router = express.Router();
// const userModel = require("./users");
// // const path = require("path");
// const config = require("../config/config");
// const multer = require("multer");
// const localStrategy = require("passport-local");
// const productModel = require("./product");
// const { serializeUser } = require('./users');
// const UserImageStorage = multer({ storage: config.userImageStorage })
// const ProductImageStorage = multer({ storage: config.productImageStorage })

// passport.use(new localStrategy(userModel.authenticate()));

// // const crypto = require('crypto');
// /* GET home page. */

// router.get('/', function(req, res) {
//   res.render('index', { title: 'Express' });
// });

// router.get('/profile', isLoggedIn, async function(req, res) {
//   let user = await userModel.findOne({username: req.session.passport.user})
//   res.send(user);
// });

// router.post('/register', async function(req, res,) {
//   // res.render('index', { title: 'Express' });
//   var userData =new userModel({
//   username:req.body.username,
//   name:req.body.name,
//   seller:req.body.seller,
//   contactnumber:req.body.contactnumber,
//   email:req.body.email
//   })

//   await userModel.register(userData,req.body.password);
//   passport.authenticate("local")(req,res,function(){
//   res.send("user registered !");
//   });   
// });

// router.post("/login",passport.authenticate("local",{
//   successRedirect: "/success",
//   failureRedirect: "/failed"
// }),function(req,res){})

// router.post("/success",function(req,res){
//   res.send("success hai !");
// })

// router.post("/failed",function(req,res){
//   res.send("failed hai !");
// })

// router.get("/logout",function(req,res){
//   req.logout(function(err){
//     if (err) { return next(err);}
//     res.redirect('/');
//   })
// })


// // Secondary routes


// router.get('/verified',isLoggedIn,async function(req,res){
//   let user  = await userModel.findOne({username: req.session.passport.user})
//   res.send(user);
// })

// router.post('/verified',isLoggedIn,async function(req,res){
//       let data = {
//         gstin: req.body.gstin,
//         address:req.body.address,
//         contactnumber:req.body.contactnumber,
//       }
//   let updateUser = await userModel.findOneAndUpdate({username: req.session.passport.user},data)
//   res.json(updateUser);
// });

// router.post("/upload",isLoggedIn,upload.single("image"), async function(req,res){
//   let user = await userModel.findOne({username: req.session.passport.user})
//   user.pic = req.file.filename;
//   await user.save();
//   res.redirect("/profile");
// });

// router.get("/create/product",isLoggedIn,  function(req,res){
//   res.send("show a create form page here......");
// });

// router.post("/create/product", isLoggedIn, ProductImageupload.array("image", 5), async function(req,res){
//   const userData = await userModel.findOne({username:req.session.passport.user});

//   if(userData.isSeller){
//   const data = {
//       sellerid: userData._id,
//       name: req.body.name,
//       pic:req.files.map(elm => elm.filename),
//       desc:req.body.desc,
//       price:req.body.price,
//       discount:req.body.discount
//   }

//   let productdata = await productModel.create(data);
//   userData.products.push(product._id);
//   await userData.save();
//   res.send("ban gaya product");
// }
// else{
//   res.send("you dont have a vendor account !");
// }
//   res.redirect("back");
// });

// router.get("/edit/product/:id", isLoggedIn, async function(req,res){
//  let product =  await productModel.findOne({_id:req.params.id})
//  res.send("this will show a form with the product data filled in ! ");
// });

// router.post("/edit/product/:id", isLoggedIn, async function(req,res){
//   let user = await userModel.findOne({username: req.session.passport.user});
//   let product =  await productModel.findOne({_id:req.params.id}  ).populate("sellerid");
//   // res.send("this will show a form with product data filled !")

//   if(product.sellerid.username === user.username){
//     await productModel.findOneAndUpdate({_id: req.params.id})
//   }
//   else{
//     res.send("yahi din dekhna rah gya tha ! ");
//   }
//  });
  
//  router.get("/delete/product/:id", isLoggedIn, async function(req,res){
//   let product =  await productModel.findOne({_id:req.params.id}).populate("sellerid");
//   let user = await userModel.findOne({username:req.session.passport.user})
//   if(product.sellerid.username === user.username){
//     // let deletedProduct = await productModel.findOneAndDelete({_id: req.params.id})
//     // user.products.splice( user.products.indexOf(product._id),1);
//     // await user.save();
//     // res.redirect("back");
//   // }
//   // else{
//     // res.redirect("something went wrong");
//     res.send("this will show a form with product data filled");
//   }
//  });

//  router.get("/wishlist/product/:id", isLoggedIn, async function(req,res){
//   let user = await userModel.findOne({username:req.session.passport.user})
//   user.wishlist.push(req.params.id);
//   await user.save();
//   res.redirect("back");
//  });

// // crypto.randomBytes(14, function(err,val){
// //   console.log(val);
// // })
// // console.log(path.extname("abcd.pdf"));



// function isLoggedIn(req,res,next){
//   if(req.isAuthenticated()){
//     return next();
//   }
//   else{
//     res.send("login karo pehle !");
//   }
// }

// module.exports = router;

//=============================================================================================

var express = require('express');
var router = express.Router();
var passport = require('passport');
const localStrategy = require('passport-local');
const multer = require('multer');
var userModel = require('./users');
const productModel = require("./product");
const { use } = require('passport');
const { findOneAndUpdate, base } = require('./users');
const storage = require("../config/multer");
const product = require('./product');
passport.use(new localStrategy(userModel.authenticate()));
const userupload = multer({ storage: storage.userimagestorage })
const productupload = multer({ storage: storage.productimagestorage })








/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get("/read", function (req, res) {
  userModel.findOneAndDelete().then(function (data) {
    res.send(data);
  })
})


router.post("/register", function (req, res) {
  var newUser = new userModel({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    seller: req.body.seller,
  });
  userModel.register(newUser, req.body.password).then(function (elem) {
    passport.authenticate('local')(req, res, function () {
      res.redirect("/profile");
    })
  })
});

router.post("/login", passport.authenticate("local", {
  successRedirect: '/profile',
  failureRedirect: "/"
}), function (req, res) { })
router.get('/logged', function (req, res, next) {
  res.send("ho gya login");
});
router.get('/failed', function (req, res, next) {
  res.send("nhi hua");
});


router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/");
  })
});

router.get("/profile", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ username: req.session.passport.user }).populate("productid");
  let verified = false;

  let ans = user.toJSON();
  var ignore = ["productid"]
  for (let i in ans) {
    if (ignore.indexOf(i) === -1 && ans[i].length === 0) {
      verified = false;
    }
  }
  console.log(ans);
  console.log(verified);
  res.render("profile", { user: user ,verified:verified});
})
// router.get("/log",function(req,res){
//   res.render("login");
// })
// secondary 



router.get("/verified", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ username: req.session.passport.user });
  res.render("verify", { user: user })
});

router.post("/verified", isLoggedIn, async function (req, res) {
  let dets = {
    contactnumber: req.body.contactnumber,
    gstin: req.body.gstin,
    address: req.body.address,
  }
  let info = await userModel.findOneAndUpdate({ username: req.session.passport.user }, dets);
  res.redirect("/profile");
});
router.get("/upload", function (req, res) {
  res.render("userpic");
})
router.post("/upload", isLoggedIn, userupload.single("image"), function (req, res) {
  userModel.findOneAndUpdate({ username: req.session.passport.user }, { pic: req.file.filename }).then(function (data) {

  })
  res.redirect("/profile");

  //  res.redirect("/");

})


router.get("/create/product", function (req, res) {
  res.render("productform");
})

router.post("/create/product", isLoggedIn, productupload.array('image', 3), function (req, res) {
  userModel.findOne({ username: req.session.passport.user }).then(function (user) {
    productModel.create({
      sellerid: user._id,
      prodname: req.body.productname,
      image: req.files.map(elem => elem.filename),
      desc: req.body.desc,
      price: req.body.price,
      discount: req.body.discount
    }).then(function (created) {
      user.productid.push(created._id);
      user.save();
      res.redirect("/profile");
    })
  });
});

router.get("/showproducts", function (req, res) {
  productModel.find().then(function (use) {
    res.render("showproducts", { use: use });
  })
})



router.get('/edit/product/:id', isLoggedIn, function (req, res) {
  productModel.findOne({ _id: req.params.id }).then(function (product) {

  })

})


router.post('/edit/product/:id', isLoggedIn, function (req, res) {
  productModel.findOne({ _id: req.params.id }).then(function (product) {
    res.send(product);
  })
})


router.get("/delete/product/:id", isLoggedIn, function (req, res) {

  userModel.findOne({ username: req.session.passport.user }).then(function (user) {
    productModel.findOne({ _id: req.params.id }).populate('sellerid').then(function (product) {
      if (user.username === product.sellerid.username) {
        productModel.findOneAndDelete({ _id: req.params.id }).then(function (del) {
        });
        userModel.findOne({ username: req.session.passport.user }).then(function (current) {
          current.productid.splice(user.productid.indexOf(product._id, 1));
          current.save();
        })
        res.redirect("/showproducts");
      }
      else {
        res.send("you cannot delete");
      }
    });

  });

});




function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();

  }
  else {
    res.redirect("/");
  }
}
module.exports = router;



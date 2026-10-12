const mongoose = require("mongoose");
const plm = require("passport-local-mongoose").default;

mongoose.connect("mongodb://127.0.0.1:27017/testingbackendEnd2");


// const userSchema = mongoose.Schema({

//   username:String,
//   nickname:String,
//   description:String,
//   categories: {
//     type:Array,
//     default:[]
//   },

//   datecreated:{
//     type:Date,
//     default:Date.now()
    
//   }
// });

const userSchema = mongoose.Schema({

  username:String,
  nickname:String,
  description:String,
  categories: {
    type:Array,
    default:[]
  },

  datecreated:{
    type:Date,
    default:Date.now()
    
  }
});

userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema);


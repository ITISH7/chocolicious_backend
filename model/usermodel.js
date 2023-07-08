//!mdbgum

const mongoose = require('mongoose'); 
// we will  encrypt password in our database , we are using bcrypt for encryption and decryption of password hash
const bcrypt = require("bcrypt");

var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user"
    },
    cart:{
        type:Array,
        default:[]
    },
    isblocked:{
        type:Boolean,
        default:false
    },
    address:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address"
    }],
    wishlist:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Whishlist"
    }],
    refreshtoken:{
        type:"string"
    }
},{
    timestamps:true
}
);

// we will use middleware functionality 

// below is used to save a password in hash form 
userSchema.pre("save",async function(next){
    const salt = await bcrypt.genSaltSync(10);
    this.password = await  bcrypt.hash(this.password,salt);

});
// retriving password and comparing with login passwword
userSchema.methods.isPasswordMatched = async function(enteredpassword){
    return await bcrypt.compare(enteredpassword,this.password)
};


//Export the model
module.exports = mongoose.model('User', userSchema);
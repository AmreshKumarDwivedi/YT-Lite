import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

const userScheme = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            
        },
        fullname:{
            
                type:String,
                required:true,
                unique:true,
                lowercase:true,
               
            
        },
        avatar:{
            type:String,//cloudanry url
            required:true

        },
        coverImage:{
            type:String,
        },
        watchHistory:[{
            type:Schema.Types.ObjectId,
            ref:"Video"
        }],
        password:{
            type:String,
            required:[true,"Password is required"]
        },
        refreshToken:{
            type:String,
        }
    }
    ,{
        timestamps:true
    }
)


userScheme.pre("save",async function(next){

    if(!this.isMofified("password")) return next();
    this.password = bcrypt.hash(this.password,10)
    next()


})
userScheme.methods.isPasswordCorrect = async function(password){
    return await bcrypt(password,this.password)

}
userScheme.method.generarteAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userScheme.method.generarteRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
          
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User = mongoose.model("User",userScheme);
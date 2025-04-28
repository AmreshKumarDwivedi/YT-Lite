

const assyncHandler = (fun)=> async ()=>{
    try{
    await fun(req,res,next)
    }
    catch(error){
      error.status(error.code || 500).json({
        success:false,
        message:err.message
      })

    }
}



export {assyncHandler}
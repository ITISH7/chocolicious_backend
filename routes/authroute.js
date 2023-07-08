const {createUser ,loginUser, getalluser, getuser, deleteuser, updateuser, handleRefreshToken, logout} = require("../contoller/userctrl");
const { authMiddleware, isAdmin } = require("../middleware/authmiddleware");
const router =  require("express").Router();

router.post("/register",createUser)
router.post("/login",loginUser)

router.get("/refresh",handleRefreshToken)
router.delete("/:id",deleteuser)
router.get("/logout",logout)
router.get("/user-details",authMiddleware,isAdmin,getalluser)
router.get("/:id",authMiddleware,isAdmin,getuser);
router.put("/edit-user",authMiddleware,updateuser)
module.exports=router;

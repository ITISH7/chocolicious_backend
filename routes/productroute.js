const { createproduct, updateProduct, deleteProduct, getaProduct, getAllProduct } = require("../contoller/productctrl");
const { authMiddleware, isAdmin } = require("../middleware/authmiddleware");

const router = require("express").Router();
router.post("/",authMiddleware,isAdmin,createproduct);
router.put("/:id",authMiddleware,isAdmin,updateProduct)
router.delete("/:id",authMiddleware,isAdmin,deleteProduct)
router.get("/:id",getaProduct)
router.get("/", getAllProduct)
module.exports = router;
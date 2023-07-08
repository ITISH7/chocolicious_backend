const product= require("../model/productmodel");
const User = require("../model/usermodel");
const asynchandler= require("express-async-handler");
const slugify =require("slugify");
const validatemongoid = require("../utils/validatemongoid");

// creating a product
const createproduct = asynchandler( async(req,res)=>{
    try{
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const newproduct = await product.create(req.body);
        res.json(newproduct)
    }catch(error){
        throw new Error(error)
    }
})
//update a product 
const updateProduct = asynchandler(async (req, res) => {
    const {id} = req.params;
    validatemongoid(id);
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const updateProduct = await product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      console.log(updateProduct);
      res.json(updateProduct);
    } catch (error) {
      throw new Error(error);
    }
  });
  //delete a product
  
  const deleteProduct = asynchandler(async (req, res) => {
    const id = req.params;
    validatemongoid(id);
    try {
      const deleteProduct = await product.findOneAndDelete(id);
      res.json(deleteProduct);
    } catch (error) {
      throw new Error(error);
    }
  });
//get single product details
  const getaProduct = asynchandler(async (req, res) => {
    const { id } = req.params;
    validatemongoid(id);
    try {
      const findProduct = await product.findById(id);
      res.json(findProduct);
    } catch (error) {
      throw new Error(error);
    }
  });
// getting details of all product with filteration , sorting , pagination 

const getAllProduct = asynchandler(async (req, res) => {
    try {
      // Filtering
      const queryObj = { ...req.query };
      console.log(queryObj)
      const excludeFields = ["page", "sort", "limit", "fields"];
      excludeFields.forEach((el) => delete queryObj[el]);
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  
      let query = product.find(JSON.parse(queryStr));
      console.log(query)
      // Sorting
  
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      } else {
        query = query.sort("-createdAt");
      }
  
      // limiting the fields
  
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
      } else {
        query = query.select("-__v");
      }
  
      // pagination
  
      const page = req.query.page;
      const limit = req.query.limit;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
      if (req.query.page) {
        const productCount = await product.countDocuments();
        if (skip >= productCount) throw new Error("This Page does not exists");
      }
      const productlist = await query;
      res.json(productlist);
    } catch (error) {
      throw new Error(error);
    }
  });


module.exports={createproduct,updateProduct,deleteProduct,getaProduct,getAllProduct}
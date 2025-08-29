const express = require("express");
const prisma = require("../db");
const router= express.Router();

const { getallproducts, 
        getproductbyid, 
        createproduct, 
        deleteproduct,
        editproduct,
    } = require("./product.service");
const { parse } = require("dotenv");

router.get("/", async (req, res) => {
  const products = await getallproducts(); 
  res.send(products);
});

router.get("/:id", async (req, res) => {
    try{
        const productid = parseInt(req.params.id);
        const product = await getproductbyid(parseInt(productid));
        res.send(product);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

router.post("/", async (req, res) => {
    try { 
        const newproducts = await req.body;
        const product = await createproduct(newproducts);
        res.send({
            data: product,
            message: "Product created successfully",
        });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id =parseInt(req.params.id);
        await deleteproduct(parseInt(id));
         res.send("Product deleted successfully");
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.put("/:id", async (req, res) => {  
  const idn =parseInt(req.params.id);
  const productdata = await req.body;

  if(!productdata.name || !productdata.description || !productdata.price || !productdata.image) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const product = await editproduct(parseInt(idn), productdata);
  res.send({
    data: product,
    message: "Product updated successfully",
  });
});

router.patch("/:id", async (req, res) => {
    try {
        const id =parseInt(req.params.id);
        const productdata = await req.body;
    
        const product = await editproduct(parseInt(id), productdata);
        res.send({
            data: product,
            message: "Product edited successfully",
        });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;

const express = require("express");
const prisma = require("../db");
const router= express.Router();

const { getallproducts, 
        createproduct, 
        deleteproduct,
        editproduct,
        getProductByName,
    } = require("./product.service");
const { parse } = require("dotenv");

router.get("/", async (req, res) => {
  const products = await getallproducts(); 
  res.send(products);
});

router.get("/:judul", async (req, res) => {
    try {
        const bookname = req.params.judul; 
        const product = await getProductByName(bookname);
        console.log(bookname);   
        res.send(product);
    } catch (err) {
        res.status(400).send(err.message);
        console.log(err);
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
  const id =parseInt(req.params.id);
  const productdata = await req.body;
  if (!productdata.judul || !productdata.pengarang || !productdata.penerbit || !productdata.tahunTerbit || !productdata.gambar) {
      return res.status(400).send({ message: "All fields are required" });
  }
  const product = await editproduct(parseInt(id), productdata);
    res.send({
        data: product,
        message: "Product put successfully",
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

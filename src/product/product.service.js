const prisma = require("../db");
const { get } = require("./product.controller");
const { findproductbyid,
        findproduct,    
        insertproduct, 
        deleteproductbyid, 
        editproductbyid,
    } = require("./product.repository");

const getallproducts = async () => {
    const products = await findproduct();
    return products;
};

const getproductbyid = async (id) => {
    
    const product = await findproductbyid(id);
    if (!product) {
        throw Error("Product not found");
    }
    return product;
};

const createproduct = async (newproducts) => {
  const product = await insertproduct(newproducts);
  return product;
};

const deleteproduct = async (id) => {
    await getproductbyid(id);
    await deleteproductbyid(id);
};

const editproduct = async (id, productdata) => {
    await getproductbyid(id);
    const product = await editproductbyid(id, productdata);
    return product;
};

module.exports = {
    getallproducts,
    getproductbyid,
    createproduct,
    deleteproduct,
    editproduct,
};
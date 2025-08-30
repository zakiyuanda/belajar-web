const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/api", (req, res) => {
    res.send("Selamat datang di API CRUD Buku");
});

const productController = require('./product/product.controller');

app.use('/products', productController); 

app.listen(PORT, () => {
  console.log("Express API runnning in port: " + PORT);
});

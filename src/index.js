const express = require('express');
const dotenv = require('dotenv');
const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get('/api', (req, res) => {
    res.send('Selamat datang di aplikasi CRUD Buku!');
});

app.get('/products', async (req, res) => { 
    const products = await prisma.product.findMany();
    res.send(products);
});     

app.post('/products', async (req, res) => {
    const newProductData = req.body;
    const product = await prisma.product.create({
        data: {
            judul: newProductData.judul,
            pengarang: newProductData.pengarang,
            penerbit: newProductData.penerbit,
            tahunTerbit: newProductData.tahunTerbit,
            gambar: newProductData.gambar
        }
    });
    res.send({
        message: 'Data buku berhasil ditambahkan', 
        data: product
    }); 
}); 



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
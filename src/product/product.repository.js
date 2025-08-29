const prisma = require("../db");

const findproduct = async () => {
    const product = await prisma.product.findMany();
    return product;
}

const findproductbyid = async (id) => {
    const product = await prisma.product.findUnique({
        where: { id: id },
    });
    return product;
}

const insertproduct = async (newproducts) => {
    const product = await prisma.product.create({
        data: {
            judul: newproducts.judul,
            pengarang: newproducts.pengarang,
            penerbit: newproducts.penerbit,
            tahunTerbit: newproducts.tahunTerbit,
            gambar: newproducts.gambar,
        },
    });
    return product;
}

const deleteproductbyid = async (id) => {
    const product = await prisma.product.delete({
        where: { id: id },
    });
    return product;
}

const editproductbyid = async (id, productdata) => {
    const product = await prisma.product.update({
        where: { id: id },
        data: {
            judul: productdata.judul,
            pengarang: productdata.pengarang,
            penerbit: productdata.penerbit,
            tahunTerbit: productdata.tahunTerbit,
            gambar: productdata.gambar,
        },
    });
    return product;
};

module.exports = {
    findproduct,
    findproductbyid,
    insertproduct,
    deleteproductbyid,
    editproductbyid,
};
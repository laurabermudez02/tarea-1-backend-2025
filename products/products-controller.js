import Products from "./products-entity.js";
import Valkey from "iovalkey";


const cache = new Valkey();

export const GetAllProducts = async  (req, res) => {
    try {
        let products = await cache.get("products")
        products = JSON.parse(products)
        if(products){
            return res.status(200).json({
                data: products,
            });
        }
        products = await Products.findAll();
        await cache.set("products", JSON.stringify(products), "EX", 3600)
        return res.status(200).json({
            message: "Lista de productos obtenida satisfactoriamente",
            products: products
        })
    } catch (error) {
        
    }
};

export const CreateProducts = async (req, res) => {
    const product = req.body;

    if (!product || !product.name) {
        return res.status(400).json({ message: "Datos de producto no válidos" });
    }

    const newProduct = await Products.create(product);
    cache.del("products ")

    return res.status(201).json({
        message: "Producto creado exitosamente",
        data: newProduct,
    });
};

export const UpdateProduct = async (req, res) => {
    const { id } = req.params;
    const productData = req.body;

    const product = await Products.findByPk(+id)

    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    const updatedProduct = await Products.update(productData, {where: {id}})
    cache.delete("products");

    return res.status(200).json({
        message: "Producto actualizado exitosamente",
        data: updatedProduct,
    });
};

export const DeleteProduct = async (req, res) => {
    const { id } = req.params;

    const product = await Products.findByPk(+id)

    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

    await Products.destroy({where: {id}});
    cache.delete("products");

    return res.status(200).json({
        message: "Producto eliminado exitosamente",
    });
};
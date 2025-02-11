import { ProductsEntity } from "./products-entity.js";

const productEntity = new ProductsEntity();

export const GetAllProducts = (req, res) => {
    const Products = productEntity.getAll();

    return res.json({
        message: 'All products',
        data: Products,
    });
};

export const CreateProducts = (req, res) => {
    const Product = req.body;

    const newProduct = productEntity.create(Product);

    return res.json({
        data: newProduct,
    });
};

export const UpdateProduct = (req, res) => {
    const { id } = req.params;
    const ProductData = req.body;

    const updatedProduct = productEntity.update(+id, ProductData);

    res.json({
        data: updatedProduct,
    });
};
export const DeleteProduct = (req, res) => {
    const { id } = req.params;

    productEntity.delete(+id);

    res.json({
        data: {
            message: "Eliminado usuario con id: " + id,
        },
    });
};
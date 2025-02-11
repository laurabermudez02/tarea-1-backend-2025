export class ProductsEntity {
    Products = [
        { id: 1, name: "banano" },
        { id: 2, name: "Leche" },
        { id: 3, name: "cereal" },
    ];
    getAll() {
        return this.Products;
    }

    get(id) {
        return this.Products.find((u) => u.id === id);
    }

    create(Product) {
        const newProduct = { name: Product.name, id: this.Products.length + 1 };
        this.Products.push(newProduct);
        return newProduct;
    }



    update(id, ProductData) {
        const newProducts = this.Products.filter((u) => u.id !== id);

        const updated = { id: id, name: ProductData.name };
        newProducts.push(updated);

        this.Products = newProducts;

        return updated;
    }


    delete(id) {
        this.Products = this.Products.filter((u) => u.id !== id);
    }
}
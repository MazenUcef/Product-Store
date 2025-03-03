import { sql } from "../config/db.js"

export const getAllProducts = async (req, res) => {
    try {
        const products = await sql`
                SELECT * FROM products
                ORDER BY created_at DESC
            `;
        console.log("fetched products", products);

        res.status(200).json({ succss: true, data: products });
    } catch (error) {
        console.error("Error fetching products", error);
        res.status(500).json({ success: false, message: "An error occurred while fetching products" });
    }
}



export const createProduct = async (req, res) => {
    const { name, price, image } = req.body
    if (!name || !price || !image) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    try {
        const newProducts = await sql`
INSERT INTO products (name, price, image)
VALUES (${name}, ${price}, ${image})
RETURNING *
`
        console.log("created product", newProducts[0]);
        res.status(201).json({ success: true, data: newProducts });
    } catch (error) {
        console.error("Error creating product", error);
        res.status(500).json({ success: false, message: "An error occurred while creating product" });
    }
}
export const getProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await sql`
SELECT * FROM products WHERE id=${id}
`
        console.log("fetched product", product);
        res.status(200).json({ success: true, data: product[0] });
    } catch (error) {
        console.error("Error fetching product", error);
        res.status(500).json({ success: false, message: "An error occurred while fetching product" });
    }
}
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, image } = req.body;
    try {
        const updateProduct = await sql`
UPDATE products
SET name=${name}, price=${price}, image=${image}
WHERE id=${id}
RETURNING *
`
        if (updateProduct.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found", data: updateProduct[0] });
        }
        console.log("updated product", updateProduct);
        res.status(200).json({ success: true, message: "Product updated successfully" });
    } catch (error) {
        console.error("Error updating product", error);
        res.status(500).json({ success: false, message: "An error occurred while updating product" });

    }
}
export const deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        const deleteProduct = await sql`
DELETE FROM products WHERE id=${id}
RETURNING *
`
        if (deleteProduct.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found", data: deleteProduct[0] });
        }
        console.log("deleted product", deleteProduct);
        res.status(200).json({ success: true, message: "Product deleted successfully", data: deleteProduct[0] });
    } catch (error) {
        console.error("Error deleting product", error);
        res.status(500).json({ success: false, message: "An error occurred while deleting product" });
    }
}
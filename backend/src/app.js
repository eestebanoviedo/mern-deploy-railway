import express from "express";
import Product from "./models/product.model.js";
import cors  from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/products", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.post("/products", async (req, res) => {
    const { name, price, description } = req.body;
    const product = await Product.create({ name, price, description });
    res.json(product);
});


export default app;


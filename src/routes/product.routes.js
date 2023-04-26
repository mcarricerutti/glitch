import { Router } from "express";
import { ProductManager } from "../ProductManager.js";

const productManager = new ProductManager('./info.txt')

const productRouter = Router() //productRouter voy a definir mis rutas

productRouter.get('/', async (req, res) => {
    let { limit } = req.query
    const products = await productManager.getProducts()
    //slice() devuelve una copia de una parte del array, sin modificar el original
    const prodLimit = products.slice(0,limit)
    res.send({ProductManager:prodLimit})
});

productRouter.get("/:id", async (req, res) => {
    const product = await productManager.getProductById(req.params.id)
    res.render("product", {
        title: product.title,
        decription: product.decription,
        price : product.price,
        code : product.code
    })
    // res.send(product)
})

productRouter.post("/", async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body
    await productManager.addProduct({ title, description, price, thumbnail, code, stock })
    res.send("Producto creado")
})

productRouter.put("/:id", async (req, res) => {
    const id = req.params.id
    const { title, description, price, thumbnail, code, stock } = req.body

    const mensaje = await productManager.updateProduct(id, { title, description, price, thumbnail, code, stock})

    res.send(mensaje)
})

productRouter.delete("/:id", async(req,res) => {
    const id = req.params.id
    const mensaje = await productManager.deleteProduct(id)
    res.send(mensaje)
})


export default productRouter
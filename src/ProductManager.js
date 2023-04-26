import {
    promises as fs
} from "fs"

export class ProductManager {
    constructor(path) {
        this.path = path
    }

    static incrementarID() {
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }

    async addProduct(producto) {
        const prodsJSON = await fs.readFile(this.path, 'utf-8')
        const prods = JSON.parse(prodsJSON)
        producto.id = ProductManager.incrementarID()
        prods.push(producto)
        await fs.writeFile(this.path, JSON.stringify(prods))
        return "Producto creado"
    }

    async getProducts() {
        const consulta = await fs.readFile(this.path, 'utf-8')
        return JSON.parse(consulta)
    }

    async getProductById(id) {
        const prodsJSON = await fs.readFile(this.path, 'utf-8')
        const prods = JSON.parse(prodsJSON)
        //some() comprueba que al menos un elemento del array cumpla la condicion
        if (prods.some(prod => prod.id === parseInt(id))) {
            //find() devuelve el primer elemento que cumpla la funcion
            return prods.find(prod => prod.id === parseInt(id))
        } else {
            return `El producto con el id ${id} no existe!🚨`
        }
    }

    async updateProduct(id, { title, description, price, thumbnail, code, stock }) {
        const prodsJSON = await fs.readFile(this.path, 'utf-8')
        const prods = JSON.parse(prodsJSON)
        if (prods.some(prod => prod.id === parseInt(id))) {
            //findIndex() devuelve el indice del primer elemento que encuentre
            let index = prods.findIndex(prod => prod.id === parseInt(id))
            prods[index].title = title
            prods[index].description = description
            prods[index].price = price
            prods[index].thumbnail = thumbnail
            prods[index].code = code
            prods[index].stock = stock
            await fs.writeFile(this.path, JSON.stringify(prods))
            return "Producto actualizado"
        } else {
            return "Producto no encontrado"
        }
    }

    async deleteProduct(id) {
        const prodsJSON = await fs.readFile(this.path, 'utf-8')
        const prods = JSON.parse(prodsJSON)
        if (prods.some(prod => prod.id === parseInt(id))) {
            //filter() crea un nuevo arr con los elementos que cumplan la condicion
            const prodsFiltrados = prods.filter(prod => prod.id !== parseInt(id))
            await fs.writeFile(this.path, JSON.stringify(prodsFiltrados))
            return "Producto eliminado"
        } else {
            return "Producto no encontrado"
        }
    }
}



class Product {
    constructor(title = "", description = "", price = 0, thumbnail = "", code = "", stock = 0) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

const TXT = async () => {
    await fs.writeFile('./info.txt', '[]')
}
await TXT()

let allProducts = new ProductManager('./info.txt')


let teclado1 = new Product("AKKO NEON", "Conjunto completo de teclas de perfil MDA.Contiene 227 teclas.", 55, "ruta1", "T20", 21);

let teclado2 = new Product("Keyboard Bubble", "Contiene 126 teclas.", 30, "ruta2", "T21", 21);

let teclado3 = new Product("FEKER IK75 V3", "Conjunto completo de teclas de perfil MDA.Contiene 227 teclas.", 75, "ruta3", "T23", 21);

let kit1 = new Product("AKKO ACR68 PRO", "Conjunto completo de teclas de perfil MDA.Contiene 227 teclas.", 45, "ruta4", "K20", 21);

let teclado4 = new Product("Logi3000", "Conjunto completo de teclas de perfil MDA.Contiene 227 teclas.", 100, "ruta1", "T24", 21);

let teclado5 = new Product("Teclab Bubble", "Contiene 126 teclas.", 30, "ruta2", "T25", 21);

let kit2 = new Product("NEON", "Conjunto completo de teclas de perfil MDA.Contiene 227 teclas.", 55, "ruta1", "T26", 21);

let kit3 = new Product("Pink", "Contiene 126 teclas.", 30, "ruta2", "T27", 21);

let kit4 = new Product("Animal pring", "Conjunto completo de teclas de perfil MDA.Contiene 227 teclas.", 75, "ruta3", "T28", 21);

let kit5 = new Product("Waves 4000", "Conjunto completo de teclas de perfil MDA.Contiene 227 teclas.", 45, "ruta4", "K29", 21);

// await allProducts.addProduct(teclado1);
// await allProducts.addProduct(teclado2);
// await allProducts.addProduct(teclado3);
// await allProducts.addProduct(kit1);
// await allProducts.addProduct(kit2);
// await allProducts.addProduct(kit3);
// await allProducts.addProduct(kit4);
// await allProducts.addProduct(kit5);
// await allProducts.addProduct(teclado5);
// await allProducts.addProduct(teclado4);

// await allProducts.getProducts();

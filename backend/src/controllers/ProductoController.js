import {Producto} from '../sequelize/index.js';

const crearProducto = async (req, res) => {
    try {
        let mesa = req.body;
        let nuevoProducto = await Producto.create(mesa,{
            fields: ["nombre", "id_categoria","precio"],
            returning: ["id","nombre", "id_categoria","precio"]
        });
        if (nuevoProducto){
            return res.status(200).json({
                mensaje: "Producto creado con exito",
                dato: nuevoProducto
            });
        }
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Ha ocurrido un error para crear una nuevo producto"
        });
    }
}

const listarProductos = async(req, res) => {
    try {
        const { idCategoria } = req.params;
        console.log(idCategoria);
        let productos;
        if(idCategoria){
            productos = await Producto.findAll({
                attributes: ["id","nombre", "id_categoria","precio"],
                where: {id_categoria: idCategoria}
            });
        }
        else{
            productos = await Producto.findAll({
                attributes: ["id","nombre", "id_categoria","precio"]
            });
        }
        return res.json({
            data: productos
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Error al traer la lista de productos"
        });
    }
}

const eliminarProducto = async (req, res) =>  {
    const { id } = req.params;
    let count = await Producto.destroy({ where: { id }});

    return res.status(200).json({
        mensaje: "Producto eliminado",
        numero_de_producto_eliminados: count
    });
}

const actualizarProducto = async (req, res) => {
    try {
        let { id } = req.params;
        await Producto.update(req.body, { where: {id},fields: ["nombre", "id_categoria","precio"]});
        return res.status(200).json({
            mensaje: "Producto actualizado"
        });
    }
    catch(e){
        console.log(e);
    }
}

export { crearProducto, listarProductos, eliminarProducto, actualizarProducto };

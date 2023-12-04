import {Categoria} from '../sequelize/index.js';

const crearCategoria = async (req, res) => {
    try {
        let categoria = req.body;
        let nuevaCategoria = await Categoria.create(categoria,{
            fields: ["nombre"]
        });
        if (nuevaCategoria){
            return res.status(200).json({
                mensaje: "Categoria creada con exito",
                dato: nuevaCategoria
            });
        }
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Ha ocurrido un error para crear una nueva categoria"
        });
    }
}

const categoriaId = async(req, res) => {
    try {
        const { id } = req.params;
        let categoria = await Categoria.findOne({ where: { id: id } });
        return res.json({
            data: categoria
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Error al traer la categoria"
        });
    }
}

const listarCategorias = async(req, res) => {
    try {
        let categorias = await Categoria.findAll();
        return res.json({
            data: categorias
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Error al traer la lista de categorias"
        });
    }
}

const eliminarCategoria = async (req, res) =>  {
    const { id } = req.params;
    let count = await Categoria.destroy({ where: { id }});

    return res.status(200).json({
        mensaje: "Categoria eliminada",
        numero_de_categorias_eliminados: count
    });
}

const actualizarCategoria = async (req, res) => {
    try {
        let { id } = req.params;
        await Categoria.update(req.body, { where: { id },fields:["nombre"]});
        return res.status(200).json({
            mensaje: "Categoria actualizada"
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Error al intentar actualizar"
        });
    }
}

export { crearCategoria, listarCategorias, eliminarCategoria, actualizarCategoria, categoriaId }
import {Restaurante} from '../sequelize/index.js';

const crearRestaurante = async (req, res) => {
    try {
        let restaurante = req.body;
        let nuevoRestaurante = await Restaurante.create(restaurante,{
            fields: ["nombre", "direccion", "max_x", "max_y"]
        });
        if (nuevoRestaurante){
            return res.status(200).json({
                mensaje: "Restaurante creado con exito",
                dato: nuevoRestaurante
            });
        }
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Ha ocurrido un error para crear un nuevo restaurante"
        });
    }
}

const restauranteId = async(req, res) => {
    try {
        const { id } = req.params;
        let restaurante = await Restaurante.findOne({ where: { id: id } });
        return res.json({
            data: restaurante
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Error al traer el restaurante"
        });
    }
}

const listarRestaurantes = async(req, res) => {
    try {
        let restaurantes = await Restaurante.findAll();
        return res.json({
            data: restaurantes
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Error al traer la lista de restaurantes"
        });
    }
}

const eliminarRestaurante = async (req, res) =>  {
    const { id } = req.params;
    let count = await Restaurante.destroy({ where: { id }});

    return res.status(200).json({
        mensaje: "Resturante eliminado",
        numero_de_restaurante_eliminados: count
    });
}

const actualizarRestaurante = async (req, res) => {
    try {
        let { id } = req.params;
        await Restaurante.update(req.body, { where: { id }});
        return res.status(200).json({
            mensaje: "Restaurante actualizado"
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Error al intentar actualizar"
        });
    }
}

export { crearRestaurante, listarRestaurantes, eliminarRestaurante, actualizarRestaurante, restauranteId }
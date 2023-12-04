import {Mesa} from '../sequelize/index.js';

const crearMesa = async (req, res) => {
    try {
        let mesa = req.body;
        let nuevoMesa = await Mesa.create(mesa,{
            fields: ["nombre_mesa", "pos_x", "pos_y", "nro_piso", "id_restaurante","capacidad"],
            returning: ["id","nombre_mesa", "pos_x", "pos_y", "nro_piso", "id_restaurante","capacidad"]
        });
        if (nuevoMesa){
            return res.status(200).json({
                mensaje: "Mesa creado con exito",
                dato: nuevoMesa
            });
        }
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Ha ocurrido un error para crear una nueva mesa"
        });
    }
}

const listarMesas = async(req, res) => {
    try {
        const { idRestaurante } = req.params;
        let mesas;
        if(idRestaurante){
            mesas = await Mesa.findAll({
                attributes: ["id","nombre_mesa", "pos_x", "pos_y", "nro_piso", "id_restaurante","capacidad"],
                where: {id_restaurante: idRestaurante}
            });
        }
        else{
            mesas = await Mesa.findAll({
                attributes: ["id","nombre_mesa", "pos_x", "pos_y", "nro_piso", "id_restaurante","capacidad"]
            });
        }
        return res.json({
            data: mesas
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Error al traer la lista de mesas"
        });
    }
}

const eliminarMesa = async (req, res) =>  {
    const { id } = req.params;
    let count = await Mesa.destroy({ where: { id }});

    return res.status(200).json({
        mensaje: "Mesa eliminada",
        numero_de_mesa_eliminados: count
    });
}

const actualizarMesa = async (req, res) => {
    try {
        let { id } = req.params;
        await Mesa.update(req.body, { where: {id}});
        return res.status(200).json({
            mensaje: "Mesa actualizada"
        });
    }
    catch(e){
        console.log(e);
    }
}

export { crearMesa, listarMesas, eliminarMesa, actualizarMesa };

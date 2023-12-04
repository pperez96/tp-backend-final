import {Cliente} from '../sequelize/index.js';

const crearCliente = async (req, res) => {
    try {
        let cliente = req.body;
        let nuevoCliente = await Cliente.create(cliente,{
            fields: ["cedula", "nombre", "apellido"]
        });
        if (nuevoCliente){
            return res.status(200).json({
                mensaje: "Cliente creado con exito",
                dato: nuevoCliente
            });
        }
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Ha ocurrido un error para crear un cliente"
        });
    }
}

const obtenerClientes = async(req, res) => {
    try {
        let clientes = await Cliente.findAll();
        return res.json({
            data: clientes
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Error al traer la lista de clientes"
        });
    }
}

const clienteCedula = async(req, res) => {
    try {
        const { cedula } = req.params;
        let cliente = await Cliente.findOne({ where: { cedula: cedula } });
        return res.json({
            data: cliente
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Error al traer el cliente"
        });
    }
}

export { crearCliente, obtenerClientes, clienteCedula }
import {Mesa, Reserva} from '../sequelize/index.js';

const crearReserva = async (req, res) => {
    try {
        let reserva = req.body;
        let mesa = await Mesa.findOne({ attributes: ["id","nombre_mesa", "pos_x", "pos_y", "nro_piso", "id_restaurante","capacidad"],
        where: { id: reserva.id_mesa } });
        if(mesa.capacidad<reserva.cantidad_solicitada){
            return res.status(500).json({
                mensaje: "La cantidad solicitada sobrepasa la capacidad de la mesa"
            });
        }
        let reservas = await Reserva.findAll({
            attributes: ["id","id_restaurante", "id_mesa", "fecha", "rango_hora", "id_cliente","cantidad_solicitada"],
            where: {
                id_restaurante: reserva.id_restaurante,
                fecha: reserva.fecha,
                id_mesa: reserva.id_mesa
            }
        });
        let rango = reserva.rango_hora.split(' ')
        let min = rango[0];
        let max = rango[2];
        for (const i in reservas) {
            rango = reservas[i].rango_hora.split(' ')
            let min1 = rango[0];
            let max1 = rango[2];
            if(min>=min1 && min<max1){
                return res.status(500).json({
                    mensaje: "Mesa ocupada en ese horario"
                });
                
            }
            if(max>min1 && max<=max1){
                return res.status(500).json({
                    mensaje: "Mesa ocupada en ese horario"
                });
                
            }
        }
        if(reserva.cantidad_solicitada<1){
            return res.status(500).json({
                mensaje: "Cantidad no valida"
            });
        }
        if(!(reserva.fecha) || new Date().toISOString().slice(0, 10)>reserva.fecha){
            return res.status(500).json({
                mensaje: "Fecha incorrecta"
            });
        }
        let nuevoReserva = await Reserva.create(reserva,{
            fields: ["id_restaurante", "id_mesa", "fecha", "rango_hora", "id_cliente","cantidad_solicitada"],
            returning: ["id","id_restaurante", "id_mesa", "fecha", "rango_hora", "id_cliente","cantidad_solicitada"]
        });
        if (nuevoReserva){
            return res.status(200).json({
                mensaje: "Reserva creado con exito",
                dato: nuevoReserva
            });
        }
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Ha ocurrido un error para crear una nueva reserva"
        });
    }
}

const listarReserva = async(req, res) => {
    try {
        const { idRestaurante, fecha, idCliente } = req.params;
        let reservas;
        if(!idCliente){
            reservas = await Reserva.findAll({
                attributes: ["id","id_restaurante", "id_mesa", "fecha", "rango_hora", "id_cliente","cantidad_solicitada"],
                where: {
                    id_restaurante: idRestaurante,
                    fecha: fecha
                },
                order: [['rango_hora','ASC'],['id_mesa','ASC']]
            });
        }
        else{
            reservas = await Reserva.findAll({
                attributes: ["id","id_restaurante", "id_mesa", "fecha", "rango_hora", "id_cliente","cantidad_solicitada"],
                where: {
                    id_restaurante: idRestaurante,
                    fecha: fecha,
                    id_cliente: idCliente
                },
                order: [['rango_hora','ASC'],['id_mesa','ASC']]
            });
        }
        return res.json({
            data: reservas
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Error al traer la lista de reserva"
        });
    }
}

export { crearReserva, listarReserva };
import {Mesa, Consumo, DetalleConsumo} from '../sequelize/index.js';

const crearConsumo = async (req, res) => {
    try {
        let consumo = req.body;//para guardar detalles, este objeto debe tener un atributo detalles: array<DetalleConsumo>

        //No se puede crear un consumo si existe una mesa abierta
        let consumo_abierto = await Consumo.findOne({where:{
            is_open: true,
            id_mesa: consumo.id_mesa
        }})
        
        if(consumo_abierto){
            return res.status(400).json({
                mensaje: "La mesa actual tiene un consumo abierto"
            })
        
        }

        consumo.fecha_creacion = new Date()
        
        let nuevoConsumo = await Consumo.create(consumo,{
            fields: ["fecha_creacion","fecha_cierre","id_cliente","total","is_open","id_mesa"],
            returning: ["id","fecha_creacion","fecha_cierre","id_cliente","total","is_open","id_mesa"]
        });
        
        //colocar el id del consumo a cada detalle y agregar
        for (const i in consumo.detalles) {
            consumo.detalles[i].id_consumo = nuevoConsumo.id
            consumo.detalles[i] = await DetalleConsumo.create(consumo.detalles[i],{fields:["id_consumo","cantidad","id_producto","subtotal"],returning:true})
        }

        nuevoConsumo = await Consumo.findByPk(nuevoConsumo.id,{include: DetalleConsumo});
        
        if (nuevoConsumo){
            return res.status(200).json({
                mensaje: "Consumo creado con exito",
                dato: nuevoConsumo
            });
        }
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Ha ocurrido un error para crear un nuevo consumo"
        });
    }
}

const obtenerConsumoByMesa = async(req, res) => {
    try {
        
        const { idMesa} = req.params;
        let consumo;
        //SI HAY UNA MESA ABIERTA ENTONCES ESE SE SELECCIONA. SI TODAS ESTAN CERRADAS
        consumo = await Consumo.findOne({
            where:{
                id_mesa: idMesa,
                is_open: true
            },
            include: DetalleConsumo
        })
        
        let existe =  consumo !== null;

        
        return res.json({
            data: consumo,
            existe: existe
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Error al traer consumo"
        });
    }
}

const obtenerConsumo = async(req, res) => {
    try {
        
        const { idConsumo} = req.params;
        let consumo;
        consumo = await Consumo.findByPk(idConsumo,{
            
            include: DetalleConsumo
        })
        
        return res.json({
            data: consumo
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Error al traer consumo"
        });
    }
}

const listarConsumo = async(req, res) => {
    try {
        
        let consumos;
        consumos = await Consumo.findAll();
        return res.json({
            data: consumos
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Error al traer lista consumo"
        });
    }
}

const modificarConsumo = async (req, res) => {
    try {
        let { idConsumo } = req.params;
        let consumo = req.body;//tiene un atributo extra indicando los detalles a eliminar, un array de id 'eliminados'
        
        let consumoBD = await Consumo.findByPk(idConsumo,{include: DetalleConsumo});
        consumoBD.id_cliente = consumo.id_cliente;

        //TODO: CONSULTAR PRECIO POR PRODUCTO LADO SERVIDOR 
        let total = 0
        //actualizar los detalles viejos y crear los nuevos
        let aux;
        for (const i in consumo.detalles) {
            console.log(consumo.detalles[i].id)
             if(consumo.detalles[i].id){//Si tiene id entonces actualizar
                aux = consumo.detalles[i].id;
                await DetalleConsumo.update(consumo.detalles[i], { where: { id : aux},fields:["id_consumo","cantidad","id_producto","subtotal"]});
             }
             else{//Si no tiene entonces crear
                consumo.detalles[i].id_consumo = consumoBD.id;
                consumo.detalles[i] = await DetalleConsumo.create(consumo.detalles[i],{fields:["id_consumo","cantidad","id_producto","subtotal"],returning:true})
             }
            total += consumo.detalles[i].subtotal
        }
        
        //se eliminan los id
        for (const i in consumo.eliminados) {
            await DetalleConsumo.destroy({ where: { id : consumo.eliminados[i] }});
        }
        
        consumoBD.total = total;
        let nuevoConsumo = await consumoBD.save({fields:["id_cliente","total"]})

        nuevoConsumo.detalles = await Consumo.findByPk(idConsumo,{include: DetalleConsumo});
        if (nuevoConsumo){
            return res.status(200).json({
                mensaje: "Consumo modificado con exito",
                dato: nuevoConsumo
            });
        }
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Ha ocurrido un error al modificar el consumo"
        });
    }
}

const cerrarConsumo = async (req, res) => {
    try {
        const { idConsumo} = req.params;
        
        let consumo = await Consumo.findByPk(idConsumo);

        consumo.is_open = false;

        consumo.fecha_cierre = new Date();

        consumo = await consumo.save()

        consumo = await Consumo.findByPk(idConsumo,{include: DetalleConsumo});

        if (consumo){
            return res.status(200).json({
                mensaje: "Consumo cerrado con exito",
                dato: consumo
            });
        }
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Ha ocurrido un error para cerrar consumo"
        });
    }
}

export { obtenerConsumoByMesa, crearConsumo, cerrarConsumo, modificarConsumo, obtenerConsumo, listarConsumo };
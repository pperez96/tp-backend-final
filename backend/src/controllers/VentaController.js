import {Producto, Venta, DetalleVenta} from '../sequelize/index.js';

const crearVenta = async (req, res) => {
    try {
        let venta = req.body;//para guardar detalles, este objeto debe tener un atributo detalles: array<DetalleVenta>

        venta.fecha = new Date()
        
        // let nuevaVenta = await Venta.create(venta,{
        //     fields: ["nro_factura","fecha","id_cliente"],
        //     returning: ["id","nro_factura","fecha","total","id_cliente"]
        // });


        for (const detalle of venta.detalles) {
            let producto = await Producto.findAll({
                attributes: ["precio"],
                where: {id: detalle.id_producto},
                raw: true
            });

            let subtotal = producto[0].precio * detalle.cantidad;
            detalle.subtotal = subtotal;
        }


        // Calcula el total sumando los subtotales de los detalles
        let totalVenta = venta.detalles.reduce((total, detalle) => total + detalle.subtotal, 0);

        // Crea la venta con el total calculado
        let nuevaVenta = await Venta.create({
            nro_factura: venta.nro_factura,
            total: totalVenta, // Utiliza el total calculado
            fecha: venta.fecha,
            id_cliente: venta.id_cliente
        }, {
            fields: ["nro_factura", "total", "fecha", "id_cliente"],
            returning: ["id", "nro_factura", "fecha", "total", "id_cliente"]
        });

        // Coloca el ID de la venta a cada detalle y agrégalos
        for (const detalle of venta.detalles) {
            let producto = await Producto.findAll({
                attributes: ["precio"],
                where: {id: detalle.id_producto},
                raw: true
            });

            let subtotal = producto[0].precio * detalle.cantidad;
            detalle.subtotal = subtotal;
            detalle.id_venta = nuevaVenta.id;
            await DetalleVenta.create(detalle, {
                fields: ["id_venta", "id_producto", "cantidad", "subtotal"]
            });
        }

        
        //colocar el id de la venta a cada detalle y agregar
        for (const i in venta.detalles) {
            venta.detalles[i].id_venta = nuevaVenta.id
            venta.detalles[i] = await DetalleVenta.create(venta.detalles[i],{fields:["id_venta","id_producto","cantidad","subtotal"],returning:true})
        }

        nuevaVenta = await Venta.findByPk(nuevaVenta.id,{include: DetalleVenta});
        
        if (nuevaVenta){
            return res.status(200).json({
                mensaje: "Venta creada con exito",
                dato: nuevaVenta
            });
        }
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Ha ocurrido un error para crear una nueva venta"
        });
    }
}

const obtenerVenta = async(req, res) => {
    try {
        
        const { idVenta} = req.params;
        let venta;
        venta = await Venta.findByPk(idVenta,{
            include: DetalleVenta
        })
        
        return res.json({
            data: venta
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Error al traer venta"
        });
    }
}

const listarVenta = async(req, res) => {
    try {
        
        let ventas;
        ventas = await Venta.findAll();
        return res.json({
            data: ventas
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Error al traer lista venta"
        });
    }
}

const modificarVenta = async (req, res) => {
    try {
        let { idVenta} = req.params;
        let venta = req.body;//tiene un atributo extra indicando los detalles a eliminar, un array de id 'eliminados'
        
        let ventaBD = await Venta.findByPk(idVenta,{include: DetalleVenta});
        ventaBD.id_cliente = venta.id_cliente;

        //TODO: CONSULTAR PRECIO POR PRODUCTO LADO SERVIDOR 
        let total = 0
        //actualizar los detalles viejos y crear los nuevos
        let aux;
        for (const i in venta.detalles) {
            console.log(venta.detalles[i].id)
             if(venta.detalles[i].id){//Si tiene id entonces actualizar
                aux = venta.detalles[i].id;
                await DetalleVenta.update(venta.detalles[i], { where: { id : aux},fields:["id_venta","id_producto","cantidad","subtotal"]});
             }
             else{//Si no tiene entonces crear
                venta.detalles[i].id_venta = ventaBD.id;
                venta.detalles[i] = await DetalleVenta.create(venta.detalles[i],{fields:["id_venta","id_producto","cantidad","subtotal"],returning:true})
             }
            total += venta.detalles[i].subtotal
        }
        
        //se eliminan los id
        for (const i in venta.eliminados) {
            await DetalleVenta.destroy({ where: { id : venta.eliminados[i] }});
        }
        
        ventaBD.total = total;
        let nuevaVenta = await ventaBD.save({fields:["id_cliente","total"]})

        nuevaVenta.detalles = await Venta.findByPk(idVenta,{include: DetalleVenta});
        if (nuevaVenta){
            return res.status(200).json({
                mensaje: "Venta modificada con exito",
                dato: nuevaVenta
            });
        }
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Ha ocurrido un error al modificar la venta"
        });
    }
}

const cerrarVenta = async (req, res) => {
    try {
        const { idVenta} = req.params;
        
        let venta = await Venta.findByPk(idVenta);

        venta.fecha = new Date();

        venta = await venta.save()

        venta = await Venta.findByPk(idVenta,{include: DetalleVenta});

        if (venta){
            return res.status(200).json({
                mensaje: "Venta cerrada con exito",
                dato: venta
            });
        }
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Ha ocurrido un error para cerrar venta"
        });
    }
}

export {crearVenta, cerrarVenta, modificarVenta, obtenerVenta, listarVenta };
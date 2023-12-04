import Sequelize from 'sequelize';
import SeqConexion from '../../config/conexion.js';

const Venta = SeqConexion.define('venta', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nro_factura: {
        type: Sequelize.INTEGER
    },
    fecha: {
        type: Sequelize.DATE
    },
    total: {
        type: Sequelize.INTEGER
    }
/*    id_cliente: {
        type: Sequelize.INTEGER
    }, */
}, {
    timestamps: false,
    tableName: 'venta'
});

const DetalleVenta = SeqConexion.define('detalle', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
/*     id_venta: {
        type: Sequelize.INTEGER
    }, */
/*     id_producto: {
        type: Sequelize.INTEGER
    }, */
    subtotal: {
        type: Sequelize.INTEGER
    },
    cantidad: {
        type: Sequelize.INTEGER
    }

}, {
    timestamps: false,
    tableName: 'detalle_venta'
});

Venta.hasMany(DetalleVenta,{ foreignKey: {allowNull: false,name:'id_venta'}});
DetalleVenta.belongsTo(Venta, { foreignKey: {allowNull: false,name:'id_venta'}});

export {Venta};
export {DetalleVenta};
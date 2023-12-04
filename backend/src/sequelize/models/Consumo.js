import Sequelize from 'sequelize';
import SeqConexion from '../../config/conexion.js';

const Consumo = SeqConexion.define('consumo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    /* id_mesa: {
        type: Sequelize.INTEGER
    }, */
    fecha_creacion: {
        type: Sequelize.DATE
    },
    fecha_cierre: {
        type: Sequelize.DATE
    },
/*     id_cliente: {
        type: Sequelize.INTEGER
    }, */
    total: {
        type: Sequelize.INTEGER
    }
    ,
    is_open: {
        type : Sequelize.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false,
    tableName: 'consumo'
});

const DetalleConsumo = SeqConexion.define('detalle', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
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
    tableName: 'detalle_consumo'
});

Consumo.hasMany(DetalleConsumo,{ foreignKey: {allowNull: false,name:'id_consumo'}});
DetalleConsumo.belongsTo(Consumo, { foreignKey: {allowNull: false,name:'id_consumo'}});

export {Consumo};
export {DetalleConsumo};
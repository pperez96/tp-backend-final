import Sequelize from 'sequelize';
import SeqConexion from '../../config/conexion.js';

const Reserva = SeqConexion.define('reserva', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    id_restaurante: {
        type: Sequelize.INTEGER
    },
    id_mesa: {
        type: Sequelize.INTEGER
    },
    fecha: {
        type: Sequelize.DATEONLY
    },
    rango_hora: {
        type: Sequelize.TEXT
    },
    id_cliente: {
        type: Sequelize.INTEGER
    },
    cantidad_solicitada: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
    tableName: 'reserva'
});

export default Reserva;
import Sequelize from 'sequelize';
import SeqConexion from '../../config/conexion.js';
import Reserva from './Reserva.js';

const Mesa = SeqConexion.define('mesa', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    id_restaurante: {
        type: Sequelize.INTEGER,
        references: {
            model: "restaurante"
        }
    },
    nombre_mesa: {
        type: Sequelize.TEXT
    },
    pos_x: {
        type: Sequelize.INTEGER
    },
    pos_y: {
        type: Sequelize.INTEGER
    },
    nro_piso: {
        type: Sequelize.INTEGER
    },
    capacidad: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
},{
    timestamps: false,
    tableName: 'mesa'
});

//Una misma mesa puede ser reservada varias veces es decir 1 a N
//Mesa.hasMany(Reserva, { foreingKey: 'id_mesa', sourceKey: 'id'});

//Varias reservas en diferentes horarios pueden pertenecer a una misma mesa, es decir N a 1
//Reserva.belongsTo(Mesa, { foreingKey: 'id_mesa', sourceKey: 'id'});

export default Mesa;
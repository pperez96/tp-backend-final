import Sequelize from 'sequelize';
import SeqConexion from '../../config/conexion.js';
import Reserva from './Reserva.js';

const Cliente = SeqConexion.define('cliente', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    cedula: {
        type: Sequelize.INTEGER
    },
    nombre: {
        type: Sequelize.TEXT
    },
    apellido:{
        type: Sequelize.TEXT
    }
}, {
    timestamps: false,
    tableName: 'cliente'
});

//Un cliente puede hacer varias reservas 1 a N
//Cliente.hasMany(Reserva, { foreingKey: 'id_cliente', sourceKey: 'id'});

// Y varias reservas corresponden a un cliente N a 1
//Reserva.belongsTo(Cliente, { foreingKey: 'id_cliente', sourceKey: 'id'})

export default Cliente;
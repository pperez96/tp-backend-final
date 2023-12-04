import Sequelize from 'sequelize';
import sequelize from '../../config/conexion.js';
import Mesa from './Mesa.js';
import Reserva from './Reserva.js';

const Restaurante = sequelize.define('restaurante',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre:{
        type: Sequelize.TEXT
    }, 
    direccion: {
        type: Sequelize.TEXT
    }, 
    max_x: {
        type: Sequelize.INTEGER
    }, 
    max_y:{
        type: Sequelize.INTEGER
    } 
}, {
    timestamps: false,
    tableName: 'restaurante'
});

//Establecemos relacion 1 a N
//Restaurante.hasMany("Mesa", { foreingKey: 'id_restaurante', sourceKey: 'id'})

//Varias mesas coresponde a un solo restaurante N a 1
//Mesa.belongsTo(Restaurante, { foreingKey: 'id_restaurante', sourceKey: 'id'});

//Un restaurante tiene muchas reservas 1 a N
//Restaurante.hasMany(Reserva, { foreingKey: 'id_restaurante', sourceKey: 'id'});

//Muchas reservas corresponden a un solo restaurante N a 1
//Reserva.belongsTo(Restaurante, { foreingKey: 'id_restaurante', sourceKey: 'id'});

export default Restaurante;
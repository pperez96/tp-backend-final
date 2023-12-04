import Sequelize from 'sequelize';
import SeqConexion from '../../config/conexion.js';

const Producto = SeqConexion.define('producto', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    id_categoria: {
        type: Sequelize.INTEGER,
        references: {
            model: "categoria"
        }
    },
    nombre: {
        type: Sequelize.TEXT
    },
    precio: {
        type: Sequelize.INTEGER
    }
},{
    timestamps: false,
    tableName: 'producto'
});

export default Producto;